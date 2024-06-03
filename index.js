// ==UserScript==
// @name         Useful Tools
// @namespace    http://tampermonkey.net/
// @version      2024-06-03
// @description  try to take over the world!
// @author       You
// @match        https://github.com/Tampermonkey/tampermonkey
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    function renderTools(tools) {
        const toolBox = document.createElement('div')
        toolBox.style.cssText = `
        width:200px;
        height:auto;
        border:1px solid red;
        padding:8px;
        border-radius:8px;
        display:grid;
        grid-template-columns:repeat(3,1fr);
        gap:4px;
        `
        tools.forEach(tool => {
            const btn = document.createElement('button')
            btn.innerText = tool.text
            toolBox.appendChild(btn)
        })

        toolBox.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                // 执行按钮的点击事件处理逻辑
                console.log('Button clicked:', e.target.textContent);
                // 可以在这里添加更多的逻辑
            }
        })
    }

    function showPWD() {
        document.querySelectorAll('input[type=password]').forEach(el => {
            el.setAttribute('type', 'input')
        })
    }

    const tools = [
        {
            text: '密码展示',
            func: showPWD
        }
    ]


    renderTools(tools)
})();