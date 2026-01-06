import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './CodeEntry.css';

const ROLE_DATA = {
    government: { name: 'State Green Dept', admin: 'S. Gupta' },
    citizen: { name: 'Chrish Cardoza', age: 21, aadhaar: 'XXXXXXXXXXXX' },
    institution: { name: 'DELL College', admin: 'Dr. A. Rao', reg: 'INST-00123' },
    college: { name: 'SHREE College', admin: 'Prof. S. Patel', reg: 'COL-00456' },
    other: { name: 'Neighborhood Green Collective', contact: 'contact@green.org' }
};

export default function CodeEntry() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const role = location.state?.role || 'citizen';

    const digitCount = role === 'citizen' ? 12 : 10;
    const [code, setCode] = useState(Array(digitCount).fill(''));
    const inputRefs = useRef([]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    useEffect(() => {
        // Auto-login when all digits are entered
        const fullCode = code.join('');
        if (fullCode.length === digitCount) {
            handleLogin();
        }
    }, [code]);

    const handleInputChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < digitCount - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === 'ArrowRight' && index < digitCount - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleLogin = () => {
        const fullCode = code.join('');

        if (role === 'citizen' && fullCode.length !== 12) {
            alert('Enter full 12-digit Aadhaar');
            return;
        }

        if (role !== 'citizen' && fullCode.length !== 10) {
            alert('Enter full 10-digit code');
            return;
        }

        login(role, ROLE_DATA[role]);
        navigate(`/dashboard/${role}`);
    };

    const handleBack = () => {
        navigate('/');
    };

    const handleAlreadyLoggedIn = () => {
        const session = localStorage.getItem(`eco_session_${role}`);
        if (session) {
            const data = JSON.parse(session);
            login(role, data.name);
            navigate(`/dashboard/${role}`);
        } else {
            alert('No active session.');
        }
    };

    return (
        <div className="wrap">
            <section className="card fade">
                <button className="btn ghost" onClick={handleBack}>
                    ← Back
                </button>

                <h3>Enter login for {role.toUpperCase()}</h3>

                <label className="small">
                    {role === 'citizen' ? 'Enter Aadhaar (12 digits)' : 'Enter 10-digit code'}
                </label>

                <div className="code-boxes">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="code-box"
                        />
                    ))}
                </div>

                <div style={{ marginTop: '10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button className="btn" onClick={handleLogin}>
                        Enter / Login
                    </button>
                    <button className="btn ghost" onClick={handleAlreadyLoggedIn}>
                        Already logged in?
                    </button>
                </div>
            </section>
        </div>
    );
}
