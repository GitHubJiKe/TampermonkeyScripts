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

        const container = document.createElement('div')
        container.appendChild(toolBox)
        container.id = 'usefulToolsContainer'
        const icon = document.createElement('div')
        icon.innerHTML = '🔨'
        icon.style.cssText = `
        cursor:pointer;
        font-size:14px;
        font-weight:600;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        text-align:center;
        transform:scale(1.5);
        `
        icon.addEventListener('click', () => {
            container.classList.toggle('show-full')
        })

        container.appendChild(icon)
        container.appendChild(toolBox)
        document.body.appendChild(container)



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
        #usefulToolsContainer {
            display: flex;
            align-items: center; 
            position: fixed;
            bottom: 10px;
            right: -270px;
            z-index:99999999;
            background-color: #fff;
            color:#000;
            width:300px;
            border: 1px solid #1772f6;
            border-radius: 8px;
            padding:0 8px;
        }

        #usefulToolBox {
            flex:11;
            height: auto;
            padding: 8px;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        #UT_showPWD {
            width: 100%;
            text-align: center;
            background-color: #1772f6;
            color: white;
            border-radius: 4px;
            border:1px solid #1772f6;
            outline:none;
            cursor:pointer;
        }

        .show-full {
            right: 10px !important;
            /* 完全展示在页面底部 */
        }
        `
        document.head.appendChild(styleEl)
    }

    insertStyle()
    renderTools(tools)
})();