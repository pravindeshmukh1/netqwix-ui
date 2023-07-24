export const EVENTS = {
    ON_DISCONNECT: "disconnecting",
    JOIN_ROOM: "JOIN_ROOM",
    DRAW: "DRAW",
    STOP_DRAWING: "STOP_DRAWING",
    MOUSE_DOWN: "MOUSE_DOWN",
    MOUSE_MOVE: "MOUSE_MOVE",
    MOUSE_UP: "MOUSE_UP",
    MOUSE_OUT: "MOUSE_OUT",
    EMIT_DRAWING_CORDS :"EMIT_DRAWING_CORDS",
    EMIT_STOP_DRAWING :"EMIT_STOP_DRAWING",
    EMIT_CLEAR_CANVAS: "EMIT_CLEAR_CANVAS",
    ON_CLEAR_CANVAS: "ON_CLEAR_CANVAS",
    EMIT_UNDO: "EMIT_UNDO",
    ON_UNDO: "ON_UNDO",
    VIDEO_CALL: {
        ON_OFFER: "offer",
        ON_SIGNAL: "signal",
        ON_ANSWER: "answer",
        ON_ICE_CANDIDATE: "ice-candidate",
        ON_STREAM: "stream",
        ON_CONNECT: "connect",
        ON_CLOSE: "close",
        MUTE_ME: "MUTE_ME"
    }
}