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
        toolBox.id = 'usefulToolBox';
        tools.forEach(tool => {
            const newDiv = document.createElement('div')
            newDiv.innerHTML = tool.htmlTemplate
            toolBox.appendChild(newDiv)
        })
        document.body.appendChild(toolBox)
        tools.forEach(tool => tool.afterMount())
    }



    const tools = [
        {
            htmlTemplate: `<button id="UT_showPWD">密码展示</button>`,
            afterMount: () => {
                document.querySelector('#UT_showPWD').addEventListener('click', () => {
                    console.log('showPWD');
                    document.querySelectorAll('input[type=password]').forEach(el => {
                        el.setAttribute('type', 'input')
                    })
                })
            }
        },
        {
            htmlTemplate: `倍速播放:<input id="UT_highSpeedPlay" type="range" min="1" max="16" value="1" /><span id="videoSpeed">1</span>`,
            afterMount: () => {
                const rangeInput = document.querySelector('#UT_highSpeedPlay');
                const videoSpeed = document.querySelector('#videoSpeed');
                rangeInput.addEventListener('input', function (event) {
                    const videoEl = document.querySelector('video')
                    if (!videoEl) {
                        return;
                    }
                    if (videoEl && videoEl.paused) {
                        alert('请先播放视频')
                        return;
                    }
                    const value = event.target.value;
                    videoSpeed.textContent = value
                    videoEl.playbackRate = value
                });
            }
        }
    ]

    function insertStyle() {
        const styleEl = document.createElement('style')
        styleEl.innerHTML = `  
        #usefulToolBox {
            height: auto;
            border: 1px solid #1772f6;
            padding: 8px;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            position: fixed;
            bottom: 10px;
            right: 10px;
            background-color: #fff;
            z-index:99999999;
        }

        #UT_showPWD {
            width: 100%;
            text-align: center;
            background-color: #1772f6;
            color: white;
            border-radius: 4px;
        }
        `
        document.head.appendChild(styleEl)
    }

    insertStyle()
    renderTools(tools)
})();