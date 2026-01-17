import { createTheme } from "@mui/material/styles";

export const getAppTheme = (mode = "light") =>
    createTheme({
        palette: {
            mode,

            primary: {
                main: "#0f7b6b",
                light: "#1aa07a"
            },

            hover:{
                main:"#46d1aa7e"
            },

            secondary: {
                main: "#1aa07a"
            },

            background:
                mode === "light"
                    ? {
                        default: "#eefbf6",
                        paper: "#ffffff"
                    }
                    : {
                        default: "#0b1614",
                        paper: "#111f1c"
                    },

            text:
                mode === "light"
                    ? {
                        primary: "#052e26",
                        secondary: "#527066"
                    }
                    : {
                        primary: "#e6f4ef",
                        secondary: "#9bbdb3"
                    },

            divider:
                mode === "light"
                    ? "rgba(15, 123, 107, 0.15)"
                    : "rgba(26, 160, 122, 0.25)"
        },

        typography: {
            fontFamily: "Inter, sans-serif"
        },

        shadows:
            mode === "light"
                ? [
                    "none",
                    "0 12px 30px rgba(10, 60, 50, 0.06)",
                    ...Array(23).fill(
                        "0 12px 30px rgba(10, 60, 50, 0.06)"
                    )
                ]
                : ["none", ...Array(24).fill("none")],

        custom: {
            gradients:
                mode === "light"
                    ? {
                        accent:
                            "linear-gradient(90deg, #0f7b6b, #1aa07a)",
                        soft:
                            "linear-gradient(180deg, #f1f9f6, #e9fff6)",
                        soft2:
                            "linear-gradient(90deg, #eafff6, #f3fff9)",
                        button:
                            "linear-gradient(90deg, #ffffff, #f7fff8)",
                        card:
                            "linear-gradient(90deg, #f7fff8, #ffffff)",
                        logo:
                            "linear-gradient(90deg, #dff9ee, #bff2de)"
                    }
                    : {
                        accent:
                            "linear-gradient(90deg, #1aa07a, #0f7b6b)",
                        soft:
                            "#181818ff",
                        soft2:
                            "linear-gradient(90deg, #132823, #0f1f1b)",
                        button:
                            "linear-gradient(90deg, #111f1c, #162c26)",
                        card:
                            "linear-gradient(90deg, #111f1c, #162c26)",
                        logo:
                            "linear-gradient(90deg, #16342c, #1f4d41)"
                    },

            heatmap: {
                low: "#2ecc71",
                medium: "#f39c12",
                high: "#e74c3c"
            }
        }
    });
