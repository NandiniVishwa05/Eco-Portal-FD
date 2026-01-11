import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#0f7b6b",     // emerald-1
            light: "#d7fff4c4"     // emerald-2
        },

        secondary: {
            main: "#1aa07a"
        },

        background: {
            default: "#eefbf6",  // bg1
            paper: "#ffffff"    // card
        },

        text: {
            primary: "#052e26",
            secondary: "#527066" // muted
        }
    },

    shape: {
        // borderRadius: // radius
    },

    typography: {
        fontFamily: "Inter, sans-serif"
    },

    shadows: [
        "none",
        "0 12px 30px rgba(10, 60, 50, 0.06)", // shadow
        ...Array(23).fill("0 12px 30px rgba(10, 60, 50, 0.06)")
    ],

    /**
     * Custom Design Tokens
     * (Safe & recommended way)
     */
    custom: {
        gradients: {
            accent: "linear-gradient(90deg, #0f7b6b, #1aa07a)",
            soft: "linear-gradient(180deg, #f1f9f6, #e9fff6)",
            soft2: "linear-gradient(90deg, #eafff6, #f3fff9)",
            button: "linear-gradient(90deg, #ffffff, #f7fff8)",
            card: "linear-gradient(90deg, #f7fff8, #ffffff)",
            logo: "linear-gradient(90deg, #dff9ee, #bff2de)"
        },

        heatmap: {
            low: "#bff0d6",
            medium: "#f39c12",
            high: "#c0392b"
        }
    }
});

export default theme;
