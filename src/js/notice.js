import { alert, notice, info, success, error } from '@pnotify/core';
import "@pnotify/core/dist/PNotify.css";
import '@pnotify/core/dist/BrightTheme.css';

export default function errorNotice() {
    const errorNotice = error({
        text: "Please enter a valid query",
        delay: 2000,
    });
};