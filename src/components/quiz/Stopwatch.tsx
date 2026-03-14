import { useState, useEffect, useRef } from "react";
import styles from "/src/styles/stopwatch.module.css";

function formatTime(ms: number): string {
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const mm = String(m).padStart(2, "0");
    const ss = String(s).padStart(2, "0");
    return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export default function Stopwatch() {
    const [elapsed, setElapsed] = useState(0);
    const [running, setRunning] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const startRef = useRef<number>(Date.now());
    const savedRef = useRef<number>(0);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // tick
    useEffect(() => {
        if (running) {
            startRef.current = Date.now() - savedRef.current;
            intervalRef.current = setInterval(() => {
                setElapsed(Date.now() - startRef.current);
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
            savedRef.current = elapsed;
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [running]);

    // close panel on outside click
    useEffect(() => {
        if (!expanded) return;
        function handleOutside(e: MouseEvent) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setExpanded(false);
            }
        }
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, [expanded]);

    function toggle() {
        setRunning((r) => !r);
    }

    function reset() {
        setRunning(false);
        setElapsed(0);
        savedRef.current = 0;
    }

    const isOverTime = elapsed >= 3600_000;

    return (
        <div ref={wrapperRef} className={styles.sw}>
            {/* ── Pill ── */}
            <div className={styles.pill} onClick={() => setExpanded((e) => !e)}>
                <span
                    className={`${styles.dot} ${running ? styles.dotRunning : ""}`}
                />
                <span
                    className={`${styles.time} ${isOverTime ? styles.overtime : ""}`}
                >
                    {formatTime(elapsed)}
                </span>
                <span className={styles.chevron}>{expanded ? "▲" : "▼"}</span>
            </div>

            {/* ── Panel ── */}
            {expanded && (
                <div className={styles.panel}>
                    <div
                        className={`${styles.display} ${isOverTime ? styles.overtime : ""}`}
                    >
                        {formatTime(elapsed)}
                    </div>

                    <div className={styles.controls}>
                        <button
                            className={`${styles.btn} ${running ? styles.btnPause : styles.btnResume}`}
                            onClick={toggle}
                        >
                            {running ? (
                                <>
                                    <svg
                                        width="13"
                                        height="13"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <rect
                                            x="6"
                                            y="4"
                                            width="4"
                                            height="16"
                                            rx="1"
                                        />
                                        <rect
                                            x="14"
                                            y="4"
                                            width="4"
                                            height="16"
                                            rx="1"
                                        />
                                    </svg>
                                    Pause
                                </>
                            ) : (
                                <>
                                    <svg
                                        width="13"
                                        height="13"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <polygon points="5,3 19,12 5,21" />
                                    </svg>
                                    Resume
                                </>
                            )}
                        </button>

                        <button
                            className={`${styles.btn} ${styles.btnReset}`}
                            onClick={reset}
                        >
                            <svg
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                            >
                                <polyline points="1,4 1,10 7,10" />
                                <path d="M3.51 15a9 9 0 1 0 .49-5" />
                            </svg>
                            Reset
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
