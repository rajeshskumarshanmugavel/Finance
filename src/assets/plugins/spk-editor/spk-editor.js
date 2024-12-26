/*!
 * =======================================================
 *  SPK Editor 1.0.0
 * =======================================================
 *
 *   Author: Spruko Technologies PVT.Ltd
 *   License: MIT
 *
 *
 * -------------------------------------------------------
 */

(function (window, document, spkEditor) {
    "use strict";

    (function (spk) {
        spk['version'] = '1.0.0';
    })(window[spkEditor] = function (source$, options$) {
        class spkEditorFn {

            constructor(source$, options$) {
                let parent = 'parent',
                    Child = 'Child',
                    Element = 'Element',
                    Node = 'Node',
                    add = 'add',
                    append = 'append',
                    remove = 'remove',
                    first = 'first',
                    textContent = 'textContent',
                    create = 'create',
                    destroy = 'destroy',
                    removeAttribute = 'removeAttribute',
                    className = 'className',
                    replace = 'replace',
                    EventListener = 'EventListener',
                    addEventListener = add + EventListener,
                    removeEventListener = remove + EventListener,
                    Before = 'Before',
                    insert = 'insert',
                    insertBefore = insert + Before,
                    push = 'push',
                    preventDefault = 'preventDefault',
                    click = 'click',
                    focus = 'focus',
                    span = 'span',
                    keydown = 'keydown',
                    view = 'view',
                    source = 'source',
                    modal = 'modal',
                    test = 'test',
                    contentEditable = 'contenteditable',
                    getSelection = 'getSelection',
                    getRangeAt = 'getRangeAt',
                    rangeCount = 'rangeCount',
                    parentNode = parent + Node,
                    tru = true,
                    fals = false,
                    nul = null,
                    div = 'div',
                    key = 'Key',
                    outerHtml = 'outerHtml',
                    arrowdown = '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m10 12.792-4.708-4.73.77-.77L10 11.229l3.938-3.937.77.77Z"/></svg>',
                    delay = setTimeout,
                    nodeName = 'nodeName',
                    firstChild = first + Child,
                    innerHTML = 'innerHTML',
                    sourceview = tru,
                    $s, i;



                let $this = this,
                    storedRange,
                    font_sizes = [8, 10, 14, 16, 18, 20, 24, 30, 36, 38, 48, 60, 72, 96],
                    font_family = ['Poppins', 'Roboto', 'EB Garamond'],
                    heading_sizes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                    config = {
                        classes: ['text-editor-spk'],
                        tags: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol'],
                        types: ['tools', 'align', 'typo', 'attachment', 'ref'],
                        tooltags: ['strong', 'em', 'code', 'ins', 's', 'sub', 'sup'],
                        tools: ['strong', 'em', 'ins', 's', 'code', 'sub', 'sup', 'color', 'bg', 'fontsize', 'fontfamily'],
                        toolsIcon: {
                            strong: ['Bold(ctrl+b)', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M5.833 15V3.333h4.542q1.437 0 2.51.823 1.073.823 1.073 2.219 0 1-.468 1.594-.469.593-1.094.906v.167q.916.312 1.448.979.531.667.531 1.729 0 1.562-1.146 2.406Q12.083 15 10.5 15Zm2.292-6.958h2.063q.666 0 1.114-.386.448-.385.448-.948 0-.541-.448-.937t-1.114-.396H8.125Zm0 4.875h2.229q.813 0 1.271-.407.458-.406.458-1.052t-.458-1.052Q11.167 10 10.354 10H8.125Z"/></svg>'],
                            em: ['Italic(ctrl+i)', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M4.167 16.667v-2.584h2.812l3.25-8.166H7.5V3.333h8.333v2.584h-2.812l-3.25 8.166H12.5v2.584Z"/></svg>'],
                            ins: ['Underline(ctrl+u)', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M4.167 17v-1.5h11.666V17ZM10 14q-1.896 0-3.198-1.302T5.5 9.5V3h2v6.5q0 1.042.729 1.771Q8.958 12 10 12q1.042 0 1.771-.729.729-.729.729-1.771V3h2v6.5q0 1.896-1.302 3.198T10 14Z"/></svg>'],
                            s: ['Strike', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M10.125 16.417q-1.5 0-2.635-.844-1.136-.844-1.678-2.344l1.417-.604q.333.958 1.073 1.604.74.646 1.844.646.979 0 1.781-.479.802-.479.802-1.521 0-.396-.114-.698-.115-.302-.344-.594h1.708q.125.25.198.573.073.323.073.719 0 1.687-1.229 2.615-1.229.927-2.896.927Zm-8.25-6.584V8.5h16.25v1.333ZM10.042 3.5q1.208 0 2.125.542.916.541 1.521 1.708l-1.417.604q-.292-.521-.833-.916-.542-.396-1.376-.396-.979 0-1.593.479Q7.854 6 7.812 6.75H6.271q.021-1.292 1.062-2.271Q8.375 3.5 10.042 3.5Z"/></svg>'],
                            code: ['Code', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m7 15-5-5 5-5 1.062 1.062L4.125 10l3.937 3.938Zm6 0-1.062-1.062L15.875 10l-3.937-3.938L13 5l5 5Z"/></svg>'],
                            sub: ['Sub', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M15.833 16.667v-1.646q0-.354.261-.615.26-.26.614-.26h1.584v-.771h-2.459V12.5h2.459q.354 0 .614.26.261.261.261.615v.771q0 .354-.261.614-.26.261-.614.261h-1.584v.771h2.459v.875ZM4.896 15l3.812-6.062-3.541-5.605h2.291l2.521 4.146 2.542-4.146h2.312l-3.562 5.605L15.104 15h-2.312l-2.813-4.5L7.208 15Z"/></svg>'],
                            sup: ['Sup', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M15.833 7.5V5.854q0-.354.261-.614.26-.261.614-.261h1.584v-.771h-2.459v-.875h2.459q.354 0 .614.261.261.26.261.614v.771q0 .354-.261.615-.26.26-.614.26h-1.584v.771h2.459V7.5ZM4.896 16.667l3.812-6.063L5.167 5h2.291l2.521 4.146L12.521 5h2.312l-3.562 5.604 3.833 6.063h-2.312l-2.813-4.5-2.771 4.5Z"/></svg>'],
                            fontsize: ['Font Size', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M11.625 16.667V5.917H7.5V3.333h10.833v2.584h-4.125v10.75Zm-7.5 0v-6.584H1.667V7.5h7.5v2.583H6.708v6.584Z"/></svg>', font_sizes],
                            fontfamily: ['Font Family', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M8.708 16.667V5.917H4.167V3.333h11.666v2.584h-4.541v10.75Z"/></svg>', font_family],
                            color: ['textColor', `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M1.625 17.5v-3.417h16.75V17.5Zm2.937-5.833L8.938 0h2.124l4.376 11.667h-2.084l-1.021-2.896H7.667l-1.021 2.896ZM8.292 7h3.416l-1.666-4.688h-.084Z"/></svg>
                            <input type="color" class="text-editor-spk-dropdown-color">`],
                            bg: ['BackgroundColor', `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M5.125 1.229 6.354 0l7.208 7.208q.48.48.48 1.146 0 .667-.48 1.146l-4.041 4.042q-.5.5-1.209.5-.708 0-1.208-.5L3.062 9.5q-.479-.479-.479-1.188 0-.708.479-1.187l3.98-3.979Zm3.146 3.146L4.354 8.292h7.834Zm7.604 9.792q-.708 0-1.208-.5t-.5-1.209q0-.437.271-.948.27-.51.604-.948.187-.27.396-.531.208-.26.437-.531.229.271.437.531.209.261.417.531.333.438.594.948.26.511.26.948 0 .709-.5 1.209-.5.5-1.208.5ZM1.667 20v-3.5h16.666V20Z"/></svg> <input type="color" class="text-editor-spk-dropdown-color">`]
                        },
                        align: ['left', 'center', 'right', 'justify'],
                        alignIcon: {
                            left: ['Left', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M4 15v-1.5h7V15Zm0-3v-1.5h12V12Zm0-3V7.5h12V9Zm0-3V4.5h12V6Z"/></svg>'],
                            right: ['Right', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M8 15v-1.5h9V15Zm0-4.25v-1.5h9v1.5ZM3 6.5V5h14v1.5Z"/></svg>'],
                            center: ['Center', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M3 17v-1.5h14V17Zm3-3.125v-1.5h8v1.5ZM3 10.75v-1.5h14v1.5Zm3-3.125v-1.5h8v1.5ZM3 4.5V3h14v1.5Z"/></svg>'],
                            justify: ['Justify', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M3 17v-1.5h14V17Zm0-3.125v-1.5h14v1.5Zm0-3.125v-1.5h14v1.5Zm0-3.125v-1.5h14v1.5ZM3 4.5V3h14v1.5Z"/></svg>'],
                        },
                        typo: ['heading', 'hr', 'p', 'quotes', 'ul', 'ol'],
                        typoIcon: {
                            heading: ['Heading', 'Heading', heading_sizes],
                            hr: ['Hr', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M4 10.75v-1.5h12v1.5Z"/></svg>'],
                            p: ['P', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M8 16v-4q-1.667 0-2.833-1.167Q4 9.667 4 8q0-1.667 1.167-2.833Q6.333 4 8 4h7v1.5h-2V16h-1.5V5.5h-2V16Z"/></svg>'],
                            quotes: ['Quotes', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M12.583 9.083h2.334V6.75h-2.334Zm-7.5 0h2.334V6.75H5.083Zm7.313 5.084 1.666-3.334h-3.229V5h5.834v5.792l-1.688 3.375Zm-7.5 0 1.666-3.334H3.333V5h5.834v5.792l-1.688 3.375Zm1.354-6.25Zm7.5 0Z"/></svg>'],
                            ul: ['Ul', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M3.5 15.25q-.417 0-.708-.292-.292-.291-.292-.708t.292-.708q.291-.292.708-.292t.708.292q.292.291.292.708t-.292.708q-.291.292-.708.292ZM6 15v-1.5h11V15Zm-2.5-4q-.417 0-.708-.292Q2.5 10.417 2.5 10t.292-.708Q3.083 9 3.5 9t.708.292q.292.291.292.708t-.292.708Q3.917 11 3.5 11Zm2.5-.25v-1.5h11v1.5Zm-2.5-4q-.417 0-.708-.292Q2.5 6.167 2.5 5.75t.292-.708q.291-.292.708-.292t.708.292q.292.291.292.708t-.292.708q-.291.292-.708.292ZM6 6.5V5h11v1.5Z"/></svg>'],
                            ol: ['Ol', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M2 16v-.75h1.5v-.375h-.75v-.75h.75v-.375H2V13h2.25v3Zm4-1v-1.5h11V15Zm-4-3.5v-.667L3.354 9.25H2V8.5h2.25v.667L2.896 10.75H4.25v.75Zm4-.75v-1.5h11v1.5ZM2.75 7V4.75H2V4h1.5v3ZM6 6.5V5h11v1.5Z"/></svg>'],
                        },
                        attachment: ['a', 'img', 'video'],
                        attachmentIcon: {
                            a: ['Link', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M9.125 14.167H5.833q-1.729 0-2.948-1.219Q1.667 11.729 1.667 10q0-1.729 1.218-2.948 1.219-1.219 2.948-1.219h3.292v1.75H5.833q-1.041 0-1.729.688-.687.687-.687 1.729t.687 1.729q.688.688 1.729.688h3.292Zm-2.458-3.292v-1.75h6.666v1.75Zm4.208 3.292v-1.75h3.292q1.041 0 1.729-.688.687-.687.687-1.729t-.687-1.729q-.688-.688-1.729-.688h-3.292v-1.75h3.292q1.729 0 2.948 1.219Q18.333 8.271 18.333 10q0 1.729-1.218 2.948-1.219 1.219-2.948 1.219Z"/></svg>'],
                            img: ['Insert Image', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M4.5 17q-.625 0-1.062-.448Q3 16.104 3 15.5v-11q0-.604.438-1.052Q3.875 3 4.5 3h11q.625 0 1.062.448Q17 3.896 17 4.5v11q0 .604-.438 1.052Q16.125 17 15.5 17Zm0-1.5h11v-11h-11v11Zm1-1.5h9l-3-4-2.25 3-1.5-2Zm-1 1.5v-11 11Z"/></svg>'],
                            video: ['Insert Video', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m8 13.5 5.5-3.5L8 6.5ZM3.5 16q-.625 0-1.062-.438Q2 15.125 2 14.5v-9q0-.625.438-1.062Q2.875 4 3.5 4h13q.625 0 1.062.438Q18 4.875 18 5.5v9q0 .625-.438 1.062Q17.125 16 16.5 16Zm0-1.5h13v-9h-13v9Zm0 0v-9 9Z"/></svg>'],
                        },
                        ref: ['unstyle', 'sourcecode'],
                        refIcon: {
                            unstyle: ['unstyle', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M11.062 8.646 9.167 6.75 6.583 4.167h10.084V6.75h-4.813Zm5.376 10.187L9.604 12l-1.646 3.833H5.146L7.625 10 1.167 3.562l1.229-1.229 15.271 15.271Z"/></svg>'],
                            sourcecode: ['Source', '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M11.625 16.667v-1.75h2.5q.333 0 .563-.229.229-.23.229-.563v-1.667q0-.812.458-1.468.458-.657 1.229-.928v-.166q-.75-.271-1.219-.917-.468-.646-.468-1.437V5.875q0-.333-.229-.562-.23-.23-.563-.23h-2.5v-1.75h2.5q1.063 0 1.802.74.74.739.74 1.802v1.667q0 .333.229.562.229.229.562.229h.875v3.334h-.875q-.333 0-.562.229-.229.229-.229.562v1.667q0 1.063-.74 1.802-.739.74-1.802.74Zm-5.75 0q-1.063 0-1.802-.74-.74-.739-.74-1.802v-1.667q0-.333-.229-.562-.229-.229-.562-.229h-.875V8.333h.875q.333 0 .562-.229.229-.229.229-.562V5.875q0-1.063.74-1.802.739-.74 1.802-.74h2.5v1.75h-2.5q-.333 0-.563.23-.229.229-.229.562v1.667q0 .791-.468 1.437-.469.646-1.219.917v.166q.771.271 1.229.928.458.656.458 1.468v1.667q0 .333.229.563.23.229.563.229h2.5v1.75Z"/></svg>'],
                        },
                        update: update,
                    },
                    $container = createElemFn(div),
                    $options = createElemFn(div),
                    $tools = createElemFn(div),
                    $align = createElemFn(div),
                    $typo = createElemFn(div),
                    $attachment = createElemFn(div),
                    $ref = createElemFn(div),
                    $viewContainer = createElemFn(div),
                    $view = createElemFn(div),
                    $viewPlaceholder = createElemFn(span),
                    $sourcecode = createElemFn(div),
                    $modal = createElemFn(div),
                    backDrop = createElemFn('div');

                $this.placeholderText = "Enter Your Text";
                function update() {

                    for (let i = 0; i <= config.tooltags.length; i++) {
                        if ($this.eleFn[config.tooltags[i]]) {
                            $this.eleFn[config.tooltags[i]].element.classList.remove('active');
                        }
                        if (selectedTags(config.tooltags[i])) {
                            $this.eleFn[config.tooltags[i]].element.classList.add('active')
                        }

                    }
                    document.querySelectorAll('b').forEach(e => {
                        let strong = createElemFn('strong');
                        let ele = e.innerHTML;
                        strong.innerHTML = ele;
                        insertAfter(strong, e);
                        e.remove();
                    })
                    document.querySelectorAll('i').forEach(e => {
                        let strong = createElemFn('em');
                        let ele = e.innerHTML;
                        strong.innerHTML = ele;
                        insertAfter(strong, e);
                        e.remove();
                    })
                    document.querySelectorAll('u').forEach(e => {
                        let strong = createElemFn('ins');
                        let ele = e.innerHTML;
                        strong.innerHTML = ele;
                        insertAfter(strong, e);
                        e.remove();
                    })
                    document.querySelectorAll('del, strike').forEach(e => {
                        let strong = createElemFn('s');
                        let ele = e.innerHTML;
                        strong.innerHTML = ele;
                        insertAfter(strong, e);
                        e.remove();
                    })


                }
                function htmlupdate() {
                    source$.innerHTML = $view.innerHTML;
                }
                function selectedTags(e) {
                    if (getSel()) {
                        // get current focus node
                        let s = getSel()[focus + 'Node'];   // This will get only the text node which is inside that particular focus node
                        // no focus node, skip!
                        if (!s) return nul;
                        // if focus node is a text node…
                        // e.g. `a|bc`
                        if (nodeFn(s)) {
                            s = s[parentNode]; // get the parent node of it if any
                            // This will be like <strong>a <em>bcd</em> efg</strong>
                        }
                        // if parent node is 
                        // This condition will triggers only if you are in the parent node
                        if (s === $view) {
                            return;
                        } else {
                            // s is the complete element where the cursor, s[nodeName.toLowerCase()] will be returned the tag and t contains the all the $tools 
                            if (s[nodeName] && lowercaseFn(s[nodeName]) === e) {
                                // this will return the complete element of node where the cursor is located
                                return s;
                            }
                            // check if we have parent node that is not `$this.view`
                            // then compare the node name of that parent with `t`
                            while (s && s !== $view) {
                                if (s[nodeName] && lowercaseFn(s[nodeName]) === e) {
                                    return s;
                                }
                                s = s[parentNode];
                            }
                        }
                        return nul; // default is `null`
                    }
                }
                // $options will store all the tools
                options$ = options$ || {};
                Object['entries'](options$).map(([key, value]) => {
                    if (key === 'config') {
                        for (i in value) {
                            if (config[i] === undefined) { return console.warn(`config option ${i} is Invalid in SPK editor`); }
                            config[i] = value[i];
                        }
                    }
                    else if (key === 'placeholderText') {
                        $this.placeholderText = value
                    }
                    else {
                        console.warn(`Invalid option ${key} was provided in SPK editor`)
                    }
                });
                let c_update = config.update,
                    c_class = config.classes[0],
                    c_toolsIcon = config.toolsIcon || {},
                    c_align = config.alignIcon || {},
                    c_typo = config.typoIcon || {},
                    c_attachment = config.attachmentIcon || {},
                    c_ref = config.refIcon || {},

                    align = {
                        left: function () {
                            checkForParentTag('left');
                        },
                        right: function () {
                            checkForParentTag('right');
                        },
                        center: function () {
                            checkForParentTag('center');
                        },
                        justify: function () {
                            checkForParentTag('justify');
                        },
                    },
                    typo = {
                        heading: function (event) {
                            event.stopPropagation();
                        },
                        hr: function () {
                            $view.focus();
                            let hr = createElemFn('hr');
                            let current = getSel().anchorNode.parentElement.closest(config.tags);
                            if (current) {
                                let ranges = splitNode(document.getSelection(), current);
                                let nextFragment = ranges.next.extractContents();
                                let splitTag = createElemFn(current.tagName.toLowerCase());
                                splitTag.append(nextFragment);
                                if (splitTag.innerText) {
                                    current.after(splitTag);
                                }
                                current.after(hr);
                            }
                        },
                        p: function () {
                            checkForParentTag('p');
                        },
                        quotes: function () {
                            checkForParentTag('quotes')
                        },
                        ul: function () {
                            checkForParentTag('ul')
                        },
                        ol: function () {
                            checkForParentTag('ol')
                        },
                    },
                    tools = {
                        strong: function () {
                            insertText('strong');
                        },
                        em: function () {
                            insertText('em');
                        },
                        ins: function () {
                            insertText('ins');
                        },
                        s: function () {
                            insertText('s');
                        },
                        code: function () {
                            insertText('code');
                        },
                        sub: function () {
                            insertText('sub');
                        },
                        sup: function () {
                            insertText('sup');
                        },
                        color: function (e) {
                            insertSpan(e.currentTarget.lastElementChild, 'color', 'change');
                        },
                        bg: function (e) {
                            insertSpan(e.currentTarget.lastElementChild, 'background-color', 'change');
                        },
                        fontsize: function (e) {
                            if (e.currentTarget.tagName.toLowerCase() === 'a') {
                                insertSpan(e.currentTarget, 'font-size', 'click');
                            }
                        },
                        fontfamily: function (e) {
                            if (e.currentTarget.tagName.toLowerCase() === 'a') {
                                insertSpan(e.currentTarget, 'font-family', 'click');
                            }
                        }
                    },
                    attachment = {
                        a: function (e) {
                            if (getSel() && (getRng().endOffset !== getRng().startOffset)) {
                                let txt = prompt('Enter your attachment URL');
                                if (txt.length) {
                                    let selectionButton = createElemFn('a');
                                    selectionButton.target = '_blank';
                                    selectionButton.href = txt;
                                    selectionButton.alt = 'URL :' + txt;
                                    var range = getRng();
                                    let newRange = document.createRange();
                                    let text = range.extractContents();
                                    selectionButton.append(text);
                                    newRange.setStart(getSel().focusNode, range.endOffset);
                                    newRange.insertNode(selectionButton);
                                }
                            }
                        },
                        img: function (e) {

                            if ($modal.style.display !== 'none') {
                                $modal.style.display = 'none';
                                backDrop.style.display = 'none';
                            } else {
                                $modal.style.display = 'block';
                                backDrop.style.display = 'block';

                                if ($container.clientWidth > $modal.clientWidth) {
                                    $modal.style.insetInlineStart = $modal.clientWidth / 2 + 'px';
                                }
                                $modal.style.insetBlockStart = $options.clientHeight + 10 + 'px';

                                $modal.innerHTML = `<div class="text-editor-spk-modal-header">
                                    <h4 class="text-editor-spk-modal-header-title">Image</h4>
                                    <a href="javascript:;" class="text-editor-spk-modal-close">X</a>
                                </div>
                                <div class="text-editor-spk-modal-body">
                                    <div class="text-editor-spk-modal-link">
                                    <label>URL link</label>
                                    <input name="urllink" type="text"  />  
                                    <span class="url-error"> Please enter a Valid URL(http|https)</span>
                                    </div>
                                    <div class="text-editor-spk-modal-upload">
                                    <label>Upload</label>
                                        <input name="locallink" type="file"  />
                                    </div>
                                </div>
                                <div class="text-editor-spk-modal-footer">
                                    <button type="button" class="spk-submit-btn">Submit</button>
                                </div>`;

                                let closeBtn = $modal.querySelector('.text-editor-spk-modal-close')
                                closeBtn.addEventListener('click', () => {
                                    if ($modal.style.display !== 'none') {
                                        $modal.style.display = 'none';
                                        backDrop.style.display = 'none';

                                    }
                                })
                                let submitBtn = $modal.querySelector('.spk-submit-btn');

                                if (getSel()) {
                                    storedRange = getRng();
                                }
                                submitBtn.addEventListener('click', submitModal)
                            }

                        },
                        video: function (e) {
                            if ($modal.style.display !== 'none') {
                                $modal.style.display = 'none';
                                backDrop.style.display = 'none';

                            } else {
                                $modal.style.display = 'block';
                                backDrop.style.display = 'block';

                                if ($container.clientWidth > $modal.clientWidth) {
                                    $modal.style.insetInlineStart = $modal.clientWidth / 2 + 'px';
                                }
                                $modal.style.insetBlockStart = $options.clientHeight + 10 + 'px';

                                $modal.innerHTML = `<div class="text-editor-spk-modal-header">
                                <h4 class="text-editor-spk-modal-header-title">Video</h4>
                                <a href="javascript:;" class="text-editor-spk-modal-close">X</a>
                            </div>
                            <div class="text-editor-spk-modal-body">
                                <div class="text-editor-spk-modal-link">
                                <label>URL link(Youtube, dailtmotion, Vimeo, ('Embaded videos'))</label>
                                <input name="urllink" type="text"  />  
                                <span class="url-error"> Please enter a Valid URL(http|https)</span>
                                </div>
                                <div class="text-editor-spk-modal-upload">
                                <label>Upload</label>
                                    <input name="locallink" type="file"  />
                                </div>
                            </div>
                            <div class="text-editor-spk-modal-footer">
                                <button type="button" class="spk-submit-btn">Submit</button>
                            </div>`;

                                let closeBtn = $modal.querySelector('.text-editor-spk-modal-close')
                                closeBtn.addEventListener('click', () => {
                                    if ($modal.style.display !== 'none') {
                                        $modal.style.display = 'none';
                                        backDrop.style.display = 'none';
                                    }
                                })
                                let submitBtn = $modal.querySelector('.spk-submit-btn');

                                if (getSel()) {
                                    storedRange = getRng();
                                }

                                submitBtn.addEventListener('click', submitVideoModal);
                            }
                        }
                    },
                    ref = {
                        sourcecode: function (e) {
                            if (sourceview) {
                                sourceview = fals;
                                let code = createElemFn('code');
                                code.innerHTML = $view.innerHTML.replace(/[<]/g, '&lt;');
                                $sourcecode.append(code);

                                $container.classList.add('source');
                                $container.classList.remove('view');

                            }
                            else {
                                sourceview = tru;
                                $sourcecode.innerHTML = '';

                                $container.classList.remove('source');
                                $container.classList.add('view');
                            }
                        },
                        unstyle: function () {

                            let sel = getSel();
                            let newRng = document.createRange();
                            var range = getRng();
                            let rangeSpan = range.cloneRange();
                            if (sel) {
                                if (getRng().commonAncestorContainer !== $view && !['UL', 'OL']['includes'](getRng().commonAncestorContainer.nodeName)) {
                                    let currentEle = range.cloneContents().textContent;
                                    range.deleteContents()
                                    newRng.setStart(rangeSpan.startContainer.parentElement.closest(['li', config.tags]), 0);
                                    newRng.setEnd(rangeSpan.startContainer, rangeSpan.startOffset);
                                    let startEle = newRng.cloneContents();
                                    startEle.appendChild(document.createTextNode(currentEle));
                                    newRng.deleteContents();
                                    newRng.insertNode(startEle);
                                    rangeSpan.startContainer.parentElement.closest(['li', config.tags]).removeAttribute('style')
                                }
                                else {
                                    let startContainer = range.startContainer.parentElement;
                                    let endContainer = range.endContainer.parentElement;

                                    if (['UL', 'OL']['includes'](getRng().commonAncestorContainer.nodeName)) {
                                        startContainer = startContainer.closest('li');
                                        endContainer = endContainer.closest('li');
                                        if (startContainer.nextElementSibling) {
                                            while (startContainer && startContainer.nextElementSibling !== endContainer) {
                                                let element = startContainer.nextElementSibling;
                                                if (element) {
                                                    element.removeAttribute('style');
                                                    let ele = element.querySelectorAll([config.tooltags, 'span']);
                                                    ele.forEach(function (el) {
                                                        el.replaceWith(...el.childNodes)
                                                    });

                                                }
                                                startContainer = startContainer.nextElementSibling;
                                            }
                                        }
                                        let newRng = document.createRange();
                                        newRng.setStart(rangeSpan.startContainer, rangeSpan.startOffset);
                                        newRng.setEndAfter(rangeSpan.startContainer.parentElement.nodeName.toLowerCase() === 'li' ? rangeSpan.startContainer.parentElement : rangeSpan.startContainer.parentElement.closest('li'));
                                        let startExt = newRng.extractContents().textContent;
                                        // appending the new element to the startContainer main container
                                        rangeSpan.startContainer.parentElement.nodeName.toLowerCase() === 'li' ? rangeSpan.startContainer.parentElement.append(startExt) : rangeSpan.startContainer.parentElement.closest('li').appendChild(createDocFragFn(startExt)[1]);
                                        newRng.setStart(rangeSpan.endContainer.parentElement.nodeName.toLowerCase() === 'li' ? rangeSpan.endContainer.parentElement : rangeSpan.endContainer.parentElement.closest('li'), 0);
                                        newRng.setEnd(rangeSpan.endContainer, rangeSpan.endOffset);

                                        // storing extracted content in new tag
                                        let endExt = newRng.extractContents().textContent;
                                        // appending the new element to the startContainer main container
                                        rangeSpan.endContainer.parentElement.nodeName.toLowerCase() === 'li' ? rangeSpan.endContainer.parentElement.prepend(endExt) : rangeSpan.endContainer.parentElement.closest('li').prepend(endExt);

                                        rangeSpan.startContainer.parentElement.nodeName.toLowerCase() === 'li' ? rangeSpan.startContainer.parentElement.removeAttribute('style') : rangeSpan.startContainer.parentElement.closest('li').removeAttribute('style');
                                        rangeSpan.endContainer.parentElement.nodeName.toLowerCase() === 'li' ? rangeSpan.endContainer.parentElement.removeAttribute('style') : rangeSpan.endContainer.parentElement.closest('li').removeAttribute('style');

                                        newRng.setStart(rangeSpan.startContainer, rangeSpan.startOffset);
                                        newRng.setEnd(rangeSpan.endContainer, rangeSpan.endOffset);

                                        sel.removeAllRanges();
                                        sel.addRange(newRng);
                                    }
                                    else {
                                        while (startContainer.closest(config.tags).nextElementSibling !== endContainer.closest(config.tags)) {
                                            let element = startContainer.closest(config.tags).nextElementSibling;
                                            element.removeAttribute('style');
                                            if (['UL', 'OL']['includes'](element.nodeName)) {
                                                let child = element.children;
                                                for (let i = 0; i < child.length; i++) {
                                                    child[i].removeAttribute('style');
                                                }
                                            }
                                            let el = element.querySelectorAll([config.tooltags, 'span', config.tags])
                                            el.forEach(e => e.replaceWith(...e.childNodes))
                                            startContainer = startContainer.closest(config.tags).nextElementSibling;
                                        }

                                        newRng.setStart(rangeSpan.startContainer, rangeSpan.startOffset);
                                        newRng.setEndAfter(rangeSpan.startContainer.parentElement.closest(config.tags));
                                        if (newRng.startContainer.parentElement.closest('UL, OL')) {
                                            let child = newRng.startContainer.parentElement.closest(`${config.tags}`).children;
                                            let i = 0, startContainerDup;
                                            startContainerDup = newRng.startContainer.parentElement.closest('li');
                                            while (true) {
                                                if (child[i] === startContainerDup) {
                                                    child[i].innerHTML = child[i].textContent;
                                                    startContainerDup = startContainerDup.nextElementSibling;
                                                }
                                                if (i === child.length) {
                                                    break;
                                                }
                                                i++;
                                            }
                                        }
                                        else {
                                            // storing extracted content in new tag
                                            let startExt = newRng.extractContents();
                                            let startEl = startExt.querySelectorAll(`${config.tooltags}, span, ${config.tags}`)
                                            startEl.forEach(e => e.replaceWith(...e.childNodes))
                                            rangeSpan.startContainer.parentElement.closest(config.tags).append(startExt);
                                            rangeSpan.startContainer.parentElement.closest(config.tags).removeAttribute('style');

                                        }

                                        newRng.setStart(rangeSpan.endContainer.parentElement.closest(config.tags), 0);
                                        newRng.setEnd(rangeSpan.endContainer, rangeSpan.endOffset);
                                        if (newRng.endContainer.parentElement.closest('UL, OL')) {
                                            let child = newRng.endContainer.parentElement.closest(`${config.tags}`).children;
                                            let i = 0, endContainerDup;
                                            endContainerDup = newRng.endContainer.parentElement.closest('li');
                                            while (true) {
                                                if (child[i] === endContainerDup) {
                                                    child[i].innerHTML = child[i].textContent;
                                                    endContainerDup = endContainerDup.nextElementSibling;
                                                    break;
                                                }
                                                i++;
                                            }
                                        }
                                        else {
                                            // storing extracted content in new tag
                                            let endExt = newRng.extractContents();
                                            let endEl = endExt.querySelectorAll(`${config.tooltags}, span, ${config.tags}`)
                                            endEl.forEach(e => e.replaceWith(...e.childNodes))
                                            rangeSpan.endContainer.parentElement.closest(config.tags).prepend(endExt);
                                            rangeSpan.endContainer.parentElement.closest(config.tags).removeAttribute('style');
                                        }
                                        newRng.setStart(rangeSpan.startContainer, rangeSpan.startOffset);
                                        newRng.setEnd(rangeSpan.endContainer, rangeSpan.endOffset);

                                        sel.removeAllRanges();
                                        sel.addRange(newRng);
                                    }
                                }
                            }
                        },
                    };

                function insertSpan(e, type, evt) {
                    let sel = getSel(),
                        rng = getRng(),
                        clnRng = rng.cloneRange(),
                        newRange = document.createRange(),
                        rangeSpan = rng.cloneRange();
                    if (getSel()) {
                        e.addEventListener(evt, function () {

                            if (rangeSpan.commonAncestorContainer !== $view && !['UL', 'OL']['includes'](clnRng.commonAncestorContainer.nodeName)) {
                                const spanTag = (rangeSpan.startContainer.parentElement.nodeName.toLowerCase() === "span" && rangeSpan.startOffset === 0 && (rangeSpan.startContainer.length === rangeSpan.endOffset)) ? rangeSpan.startContainer.parentElement : rangeSpan.startContainer.nodeName.toLowerCase() === "span" ? rangeSpan.startContainer : null;
                                const spanTagParent = rangeSpan.startContainer.parentElement.closest('span');
                                if (spanTag) {
                                    if (!e.value && e.textContent) {
                                        e.value = e.textContent;
                                    }
                                    if (type === 'font-size') {
                                        e.value += "px";
                                    }
                                    spanTag.style.setProperty(type, e.value);
                                }
                                else if (spanTagParent) {

                                    if (rangeSpan.commonAncestorContainer.nodeType === 3) {

                                        let cloneText = rangeSpan.cloneContents();
                                        let cloneComplete = rangeSpan.commonAncestorContainer.parentElement.nodeName === 'SPAN' ? rangeSpan.commonAncestorContainer.parentElement : rangeSpan.commonAncestorContainer.parentElement.closest('span');
                                        let span = cloneComplete.cloneNode();
                                        let currentText = cloneText;
                                        span.append(currentText);
                                        if (!e.value && e.textContent) {
                                            e.value = e.textContent;
                                        }
                                        if (type === 'font-size') {
                                            e.value += "px";
                                        }
                                        span.style.setProperty(type, e.value);

                                        rangeSpan.deleteContents();

                                        rangeSpan.insertNode(span);
                                        if (span.innerHTML.match('span')) {
                                            const innerSpan = span.querySelectorAll('span');
                                            innerSpan.forEach((ele) => {
                                                if (ele.innerHTML === '' || ele.innerHTML === null) {
                                                    ele.remove();
                                                }
                                                if (ele.style.getPropertyValue(type)) {
                                                    ele.style.removeProperty(type);
                                                }
                                                if (!ele.style.length) {
                                                    ele.replaceWith(...ele.childNodes)
                                                }
                                            })
                                        }
                                    }
                                    else {
                                        let cloneText = rangeSpan.cloneContents();
                                        let span = createElemFn('span');

                                        let currentText = cloneText;
                                        span.append(currentText);
                                        if (!e.value && e.textContent) {
                                            e.value = e.textContent;
                                        }
                                        if (type === 'font-size') {
                                            e.value += "px";
                                        }
                                        span.style.setProperty(type, e.value);

                                        rangeSpan.deleteContents();

                                        rangeSpan.insertNode(span);
                                        if (span.innerHTML.match('span')) {
                                            const innerSpan = span.querySelectorAll('span');
                                            innerSpan.forEach((ele) => {
                                                if (ele.innerHTML === '' || ele.innerHTML === null) {
                                                    ele.remove();
                                                }
                                                if (ele.style.getPropertyValue(type)) {
                                                    ele.style.removeProperty(type);
                                                }
                                                if (!ele.style.length) {
                                                    ele.replaceWith(...ele.childNodes)
                                                }
                                            })
                                        }
                                    }
                                }
                                else {
                                    let span = createElemFn('span');
                                    if (!e.value && e.textContent) {
                                        e.value = e.textContent;
                                    }
                                    if (type === 'font-size') {
                                        e.value += "px";
                                    }
                                    span.style.setProperty(type, e.value);
                                    const dataSel = rangeSpan.extractContents();
                                    span.append(dataSel);
                                    if (span.innerHTML.match('span')) {
                                        const innerSpan = span.querySelectorAll('span');
                                        innerSpan.forEach((ele) => {
                                            if (ele.innerHTML === '' || ele.innerHTML === null) {
                                                ele.remove();
                                            }
                                            if (ele.style.getPropertyValue(type)) {
                                                ele.style.removeProperty(type);
                                            }
                                            if (!ele.style.length) {
                                                ele.replaceWith(...ele.childNodes)
                                            }
                                        })
                                    }
                                    newRange.setStart(rangeSpan.startContainer, rangeSpan.startOffset);
                                    newRange.insertNode(span);
                                    setCursorAtEndOfContenteditable(span);
                                }
                                let excesSpanParent = rangeSpan.commonAncestorContainer.parentElement;
                                if (excesSpanParent.innerHTML.match('span')) {
                                    const innerSpan = excesSpanParent.querySelectorAll('span');
                                    innerSpan.forEach((ele) => {
                                        if (ele.innerHTML === '' || ele.innerHTML === null) {
                                            ele.remove();
                                        }
                                        if (!ele.style.length) {
                                            ele.replaceWith(...ele.childNodes)
                                        }
                                    })
                                }

                            } else {
                                let startContainer = rng.startContainer.parentNode;
                                let endContainer = rng.endContainer.parentNode;
                                if (!e.value && e.textContent) {
                                    e.value = e.textContent;
                                }
                                if (type === 'font-size') {
                                    e.value += "px";
                                }
                                if (['UL', 'OL']['includes'](clnRng.commonAncestorContainer.nodeName)) {
                                    uolist(startContainer, endContainer, 'span', clnRng, sel, type, e);
                                }

                                else {
                                    while (startContainer.closest(config.tags).nextElementSibling !== endContainer.closest(config.tags)) {
                                        let element = startContainer.closest(config.tags).nextElementSibling;

                                        // creating and wrapping the inner element

                                        if (['UL', 'OL']['includes'](element.nodeName)) {
                                            let child = element.children;
                                            for (let i = 0; i < child.length; i++) {
                                                let span = document.createElement('span');
                                                span.style.setProperty(type, e.value);
                                                // creating and wrapping the inner element
                                                span.innerHTML = child[i].innerHTML;
                                                child[i].innerHTML = "";
                                                child[i].append(span);
                                            }
                                        }
                                        else {
                                            let span = createElemFn('span');
                                            span.style.setProperty(type, e.value);
                                            span.innerHTML = element.innerHTML;
                                            element.innerHTML = "";
                                            element.append(span);
                                        }
                                        startContainer = startContainer.closest(config.tags).nextElementSibling;
                                    }

                                    let newRng = document.createRange();
                                    newRng.setStart(rangeSpan.startContainer, rangeSpan.startOffset);
                                    newRng.setEndAfter(rangeSpan.startContainer.parentElement.closest(config.tags));
                                    if (newRng.startContainer.parentElement.closest('UL, OL')) {
                                        let child = newRng.startContainer.parentElement.closest(`${config.tags}`).children;
                                        let i = 0, startContainerDup;
                                        startContainerDup = newRng.startContainer.parentElement;
                                        while (true) {
                                            if (child[i] === startContainerDup) {
                                                let span = document.createElement('span');
                                                span.style.setProperty(type, e.value);
                                                // creating and wrapping the inner element
                                                span.innerHTML = child[i].innerHTML;
                                                child[i].innerHTML = "";
                                                child[i].append(span);
                                                startContainerDup = startContainerDup.nextElementSibling;
                                            }
                                            if (i === child.length) {
                                                break;
                                            }
                                            i++;
                                        }
                                    }
                                    else {

                                        // storing extracted content in new tag
                                        let startExt = newRng.extractContents();
                                        let spanStart = document.createElement('span');

                                        spanStart.style.setProperty(type, e.value);
                                        spanStart.append(startExt);

                                        // removing the main container elements and same tag inside the selected element
                                        // removing the main container elements and same tag inside the selected element
                                        let removeTag = spanStart.querySelectorAll(`${config.tags}`);
                                        removeTag.forEach(function (c) {
                                            c.replaceWith(...c.childNodes);
                                        });
                                        // appending the new element to the startContainer main container
                                        rangeSpan.startContainer.parentElement.closest(config.tags).append(spanStart);
                                    }

                                    newRng.setStart(rangeSpan.endContainer.parentElement.closest(config.tags), 0);
                                    newRng.setEnd(rangeSpan.endContainer, rangeSpan.endOffset);
                                    if (newRng.endContainer.parentElement.closest('UL, OL')) {
                                        let child = newRng.endContainer.parentElement.closest(`${config.tags}`).children;
                                        let i = 0, loop = true;
                                        while (loop) {
                                            let span = document.createElement('span');
                                            span.style.setProperty(type, e.value);
                                            // creating and wrapping the inner element
                                            span.innerHTML = child[i].innerHTML;
                                            child[i].innerHTML = "";
                                            child[i].append(span);
                                            i++;
                                            if (child[i] === newRng.endContainer.parentElement) {
                                                let span = document.createElement('span');
                                                span.style.setProperty(type, e.value);
                                                // creating and wrapping the inner element
                                                span.innerHTML = child[i].innerHTML;
                                                child[i].innerHTML = "";
                                                child[i].append(span);
                                                break;
                                            }
                                        }
                                    }
                                    else {
                                        // storing extracted content in new tag
                                        let endExt = newRng.extractContents();
                                        let spanEnd = document.createElement('span');
                                        spanEnd.style.setProperty(type, e.value);
                                        spanEnd.append(endExt);
                                        // removing the main container elements and same tag inside the selected element
                                        let removeTag = spanEnd.querySelectorAll(`${config.tags}`);
                                        removeTag.forEach(function (c) {
                                            c.replaceWith(...c.childNodes);
                                        });
                                        // appending the new element to the startContainer main container
                                        rangeSpan.endContainer.parentElement.closest(config.tags).prepend(spanEnd);
                                    }
                                    newRng.setStart(rangeSpan.startContainer, rangeSpan.startOffset);
                                    newRng.setEnd(rangeSpan.endContainer, rangeSpan.endOffset);





                                    sel.removeAllRanges();
                                    sel.addRange(newRng);
                                }

                            }
                        }, {
                            once: true
                        })
                    }
                }
                function insertText(tag) {
                    if (getSel()) {
                        let sel = getSel(),
                            range = getRng(),
                            rangeSpan = range.cloneRange();
                        if (rangeSpan.startOffset === rangeSpan.endOffset && rangeSpan.commonAncestorContainer !== $view) {
                            let el = range.startContainer.parentElement.closest(tag);
                            if (el) {
                                let newRng = document.createRange();

                                newRng.setStart(rangeSpan.endContainer, rangeSpan.endOffset);
                                newRng.setEndAfter(rangeSpan.startContainer.parentElement.closest(['li', config.tags]));
                                let endEle = newRng.cloneContents().firstElementChild.innerHTML;
                                newRng.deleteContents();

                                let ele = range.startContainer.parentElement.closest(['li', config.tags]);
                                ele.append(createDocFragFn('&nbsp')[1], createDocFragFn(endEle)[1]);

                                newRng.setStartAfter(rangeSpan.startContainer);
                                newRng.setEndAfter(rangeSpan.startContainer.parentElement.nextSibling);
                                //get the sel object (allows you to change sel)
                                sel.removeAllRanges();//remove any selections already made
                                sel.addRange(newRng);
                            }
                            else {
                                let newRng = document.createRange();

                                let tagName = createElemFn(tag);
                                tagName.innerHTML = '&nbsp;'
                                newRng.setStart(range.startContainer, range.startOffset);
                                newRng.insertNode(tagName);
                                newRng.setStartAfter(range.startContainer);
                                newRng.setEndAfter(tagName);
                                //get the sel object (allows you to change sel)
                                sel.removeAllRanges();//remove any selections already made
                                sel.addRange(newRng);
                            }

                        }
                        else if (getRng().commonAncestorContainer !== $view && !['UL', 'OL']['includes'](getRng().commonAncestorContainer.nodeName)) {
                            let startContainer = rangeSpan.startContainer.nodeType === 3 ? rangeSpan.startContainer.parentElement : rangeSpan.startContainer;
                            if (startContainer.nodeName.toLowerCase() === tag && range.startOffset === 0) {
                                // && ( range.startContainer.parent !== range.endContainer.parentElement ) 941
                                let text = range.extractContents();
                                let txt = Array.from(text.childNodes).filter(child => child);
                                let appendtxt = "";
                                if (txt.length) {
                                    txt.forEach(child => {
                                        if (child.nodeName.toLowerCase() === tag) {
                                            appendtxt += child.innerHTML;
                                        }
                                    })
                                }
                                range.insertNode(createDocFragFn(appendtxt)[1]);
                            }
                            else if ((range.startContainer.parentElement.nodeName.toLowerCase() === tag || range.startContainer.parentElement.closest(tag)) && ((range.startContainer.parentElement.closest(tag) && (range.startContainer.parentElement.closest(tag).nodeName.toLowerCase() === tag)) === (range.endContainer.parentElement.closest(tag) && (range.endContainer.parentElement.closest(tag).nodeName.toLowerCase() === tag)))) {
                                let text = getSel().anchorNode.parentElement.closest(config.tags);
                                let ranges = splitNode(document.getSelection(), text);
                                let currentFragment = ranges.current.extractContents();
                                let nextFragment = ranges.next.extractContents();
                                currentFragment.appendChild(nextFragment);
                                let ele = startContainer.closest(config.tags);
                                ele.append(currentFragment);
                                let nextArrival;

                                let arrival = rangeSpan.startContainer.parentElement.nextElementSibling;
                                while (arrival) {
                                    if (arrival.nodeName.toLowerCase() === tag) {
                                        nextArrival = arrival;
                                        break;
                                    }

                                    arrival = arrival.nextElementSibling;
                                }
                                let newRng = document.createRange();

                                newRng.setStart(rangeSpan.startContainer, rangeSpan.startOffset);
                                newRng.setEndBefore(nextArrival);

                                // //get the sel object (allows you to change sel)
                                sel.removeAllRanges();//remove any selections already made
                                sel.addRange(newRng);
                            }
                            else {
                                let selectionButton = createElemFn(tag);
                                let text = range.extractContents();
                                selectionButton.append(text);
                                // used to remove the inner tags
                                let selectionTxt = selectionButton.innerHTML.replaceAll(`<${tag}>`, '');
                                selectionButton.innerHTML = selectionTxt;
                                let newRng = document.createRange()

                                newRng.setStart(getSel().focusNode, range.endOffset);
                                newRng.setStart(getSel().focusNode, range.endOffset);
                                newRng.insertNode(selectionButton);

                                newRng.setStart(selectionButton, 0);
                                newRng.setEndAfter(selectionButton);
                                //get the sel object (allows you to change sel)
                                sel.removeAllRanges();//remove any selections already made
                                sel.addRange(newRng);
                            }
                        }
                        else {
                            let startContainer = range.startContainer.parentElement,
                                endContainer = range.endContainer.parentElement;

                            if (['UL', 'OL']['includes'](getRng().commonAncestorContainer.nodeName)) {
                                uolist(startContainer, endContainer, tag, rangeSpan, sel);
                            }
                            if (range.commonAncestorContainer === $view) {
                                let startContainer = range.startContainer.nodeType === 3 ? range.startContainer.parentElement : range.startContainer;
                                let endContainer = range.endContainer.nodeType === 3 ? range.endContainer.parentElement : range.endContainer;
                                if ((startContainer.closest(tag) || startContainer.nodeName.toLowerCase() === tag) && (endContainer.closest(tag) || endContainer.nodeName.toLowerCase() === tag)) {
                                    while (startContainer.closest(config.tags).nextElementSibling !== endContainer.closest(config.tags)) {
                                        let element = startContainer.closest(config.tags).nextElementSibling,
                                            ele = element.querySelectorAll(tag);
                                        // used to remove the inner tag of selector
                                        ele.forEach(function (el) {
                                            el.replaceWith(...el.childNodes)
                                        });
                                        // } 
                                        let newRng = document.createRange();

                                        newRng.setStart(rangeSpan.startContainer, rangeSpan.startOffset);
                                        newRng.setEndAfter(rangeSpan.startContainer.parentElement.closest(config.tags));
                                        startContainer = startContainer.closest(config.tags).nextElementSibling;
                                    }

                                    let newRng = document.createRange();

                                    newRng.setStart(rangeSpan.startContainer, rangeSpan.startOffset);
                                    newRng.setEndAfter(rangeSpan.startContainer.parentElement.closest(config.tags));
                                    // storing extracted content in new tag
                                    let startExt = newRng.extractContents(),
                                        startE = document.createDocumentFragment();

                                    startE.append(startExt);
                                    let e = startE.querySelectorAll(`${config.tags}, ${tag}`);
                                    // removing the main container elements and same tag inside the selected element
                                    e.forEach(function (c) {
                                        c.replaceWith(...c.childNodes);
                                    });
                                    // appending the new element to the startContainer main container
                                    rangeSpan.startContainer.parentElement.closest(config.tags).append(startE);

                                    newRng.setStart(rangeSpan.endContainer.parentElement.closest(config.tags), 0);
                                    newRng.setEnd(rangeSpan.endContainer, rangeSpan.endOffset);
                                    // storing extracted content in new tag
                                    let endExt = newRng.extractContents(),
                                        endE = document.createDocumentFragment();
                                    endE.append(endExt);
                                    // removing the main container elements and same tag inside the selected element
                                    let endEle = endE.querySelectorAll(`${config.tags}, ${tag}`);
                                    endEle.forEach(function (c) {
                                        c.replaceWith(...c.childNodes);
                                    });
                                    // appending the new element to the startContainer main container
                                    rangeSpan.endContainer.parentElement.closest(config.tags).prepend(endE);
                                }
                                else {
                                    while (startContainer.closest(config.tags).nextElementSibling !== endContainer.closest(config.tags)) {
                                        let element = startContainer.closest(config.tags).nextElementSibling,
                                            ele = element.querySelectorAll(tag),
                                            tagName = document.createElement(tag);
                                        if (['UL', 'OL']['includes'](element.nodeName)) {
                                            let child = element.children;
                                            for (let i = 0; i < child.length; i++) {
                                                tagName = document.createElement(tag);

                                                // creating and wrapping the inner element
                                                tagName.innerHTML = child[i].innerHTML;
                                                child[i].innerHTML = "";
                                                child[i].append(tagName);
                                            }
                                        }
                                        else {
                                            // used to remove the inner tag of selector
                                            ele.forEach(function (el) {
                                                el.replaceWith(...el.childNodes)
                                            });
                                            // creating and wrapping the inner element
                                            tagName.innerHTML = element.innerHTML;
                                            element.innerHTML = "";
                                            element.append(tagName);
                                        }
                                        startContainer = startContainer.closest(config.tags).nextElementSibling;
                                    }

                                    let newRng = document.createRange();

                                    newRng.setStart(rangeSpan.startContainer, rangeSpan.startOffset);
                                    newRng.setEndAfter(rangeSpan.startContainer.parentElement.closest(config.tags));
                                    if (newRng.startContainer.parentElement.closest('UL, OL')) {
                                        let child = newRng.startContainer.parentElement.closest(`${config.tags}`).children;
                                        let i = 0, startContainerDup;
                                        startContainerDup = newRng.startContainer.parentElement;
                                        while (true) {
                                            if (child[i] === startContainerDup) {
                                                let tagName = document.createElement(tag);

                                                // creating and wrapping the inner element
                                                tagName.innerHTML = child[i].innerHTML;
                                                child[i].innerHTML = "";
                                                child[i].append(tagName);
                                                startContainerDup = startContainerDup.nextElementSibling;
                                            }
                                            if (i === child.length) {
                                                break;
                                            }
                                            i++;
                                        }
                                    }
                                    else {
                                        // storing extracted content in new tag
                                        let startExt = newRng.extractContents(),
                                            startE = document.createElement(tag);
                                        startE.append(startExt);
                                        let e = startE.querySelectorAll([config.tags, tag]);
                                        // removing the main container elements and same tag inside the selected element
                                        e.forEach(function (c) {
                                            c.replaceWith(...c.childNodes);
                                        });
                                        // appending the new element to the startContainer main container
                                        rangeSpan.startContainer.parentElement.closest(config.tags).append(startE);
                                    }

                                    newRng.setStart(rangeSpan.endContainer.parentElement.closest(config.tags), 0);
                                    newRng.setEnd(rangeSpan.endContainer, rangeSpan.endOffset);
                                    // storing extracted content in new tag
                                    if (newRng.endContainer.parentElement.closest('UL, OL')) {
                                        let child = newRng.endContainer.parentElement.closest(`${config.tags}`).children;
                                        let i = 0, loop = true;
                                        while (loop) {
                                            let tagName = document.createElement(tag);

                                            // creating and wrapping the inner element
                                            tagName.innerHTML = child[i].innerHTML;
                                            child[i].innerHTML = "";
                                            child[i].append(tagName);
                                            i++;
                                            if (child[i] === newRng.endContainer.parentElement) {
                                                let tagName = document.createElement(tag);

                                                // creating and wrapping the inner element
                                                tagName.innerHTML = child[i].innerHTML;
                                                child[i].innerHTML = "";
                                                child[i].append(tagName);
                                                break;
                                            }
                                        }
                                    }
                                    else {
                                        let endExt = newRng.extractContents(),
                                            endE = document.createElement(tag);
                                        endE.append(endExt);
                                        // removing the main container elements and same tag inside the selected element
                                        let endEle = endE.querySelectorAll([config.tags, tag]);
                                        endEle.forEach(function (c) {
                                            c.replaceWith(...c.childNodes);
                                        });
                                        // appending the new element to the startContainer main container
                                        rangeSpan.endContainer.parentElement.closest(config.tags).prepend(endE);
                                    }
                                    newRng.setStart(rangeSpan.startContainer, rangeSpan.startOffset);
                                    newRng.setEnd(rangeSpan.endContainer, rangeSpan.endOffset);
                                    sel.removeAllRanges();
                                    sel.addRange(newRng);
                                }
                            }
                        }
                    }
                }
                function uolist(startContainer, endContainer, tag, clnRng, sel, type, value) {
                    while (startContainer && startContainer.nextElementSibling !== endContainer) {
                        let element = startContainer.nextElementSibling,
                            // used to remove the inner tag of selector
                            ele = element.querySelectorAll(tag),
                            tagName = document.createElement(tag);
                        // creating and wrapping the inner element

                        tagName.innerHTML = element.innerHTML;
                        element.innerHTML = "";
                        if (type) {
                            tagName.style.setProperty(type, value.value);
                        }
                        ele.forEach(function (el) {
                            el.replaceWith(...el.childNodes)
                        });
                        element.append(tagName);

                        startContainer = startContainer.nextElementSibling;
                    }
                    let newRng = document.createRange(),
                        startE = document.createElement(tag);
                    newRng.setStart(clnRng.startContainer, clnRng.startOffset);
                    newRng.setEndAfter(clnRng.startContainer.parentElement);
                    let startExt = newRng.extractContents();

                    // storing extracted content in new tag
                    startE.append(startExt);
                    if (type) {
                        startE.style.setProperty(type, value.value);
                        let e = startE.querySelectorAll([config.tags, 'li']);
                        e.forEach(function (c) {
                            c.replaceWith(...c.childNodes);
                        });
                    }
                    // removing the main container elements and same tag inside the selected element
                    else {
                        let e = startE.querySelectorAll([config.tags, tag, 'li']);
                        e.forEach(function (c) {
                            c.replaceWith(...c.childNodes);
                        });
                    }
                    // appending the new element to the startContainer main container
                    clnRng.startContainer.parentElement.append(startE);

                    newRng.setStart(clnRng.endContainer.parentElement, 0);
                    newRng.setEnd(clnRng.endContainer, clnRng.endOffset);

                    // storing extracted content in new tag
                    let endExt = newRng.extractContents(),
                        endE = document.createElement(tag);
                    endE.append(endExt);
                    if (type) {
                        endE.style.setProperty(type, value.value);
                    }
                    // removing the main container elements and same tag inside the selected element
                    else {
                        let endEle = endE.querySelectorAll([config.tags, tag, 'li']);
                        endEle.forEach(function (c) {
                            c.replaceWith(...c.childNodes);
                        });
                    }
                    // appending the new element to the startContainer main container
                    clnRng.endContainer.parentElement.prepend(endE);

                    newRng.setStart(clnRng.startContainer, clnRng.startOffset);
                    newRng.setEnd(clnRng.endContainer, clnRng.endOffset);

                    sel.removeAllRanges();
                    sel.addRange(newRng);
                }
                function skipKeys(e) {
                    return e.keyCode !== 17 && e.keyCode !== 16 && e.keyCode !== 18 && e.keyCode !== 91 && e.keyCode !== 92 && e.keyCode !== 20 && e.keyCode !== 37 && e.keyCode !== 38 && e.keyCode !== 39 && e.keyCode !== 40 && e.keyCode !== 33 && e.keyCode !== 34 && e.keyCode !== 35 && e.keyCode !== 36 && e.keyCode !== 45 && e.keyCode !== 145 && e.keyCode !== 144;
                }
                function createElemFn(ele) {
                    return document[create + Element](ele);
                }

                function lowercaseFn(text) {
                    return text.toLowerCase();
                }

                function stringFn(val) {
                    return typeof val === "string";
                }

                function nodeFn(ele) {
                    return ele.nodeType === 3;
                }

                function funcFn(val) {
                    return typeof val === "function";
                }

                function regPatternFn(a, b) {
                    return new RegExp(a, b);
                }

                function textFn(s, t) {
                    t = t || '[\\w-:]+';
                    return s[replace](regPatternFn('<\\/' + t + '>|<' + t + '(\\s[^<>]*?)?>', 'gi'), "")[replace](/ +/g, ' ')[replace](/^\s*|\s*$/g, "");
                }

                function addEvntLstnr(document, event, opt) {
                    return document[addEventListener](event, opt, { passive: fals });
                }

                function rmvEvntLstnr(document, event, opt) {
                    return document[removeEventListener](event, opt, { passive: fals });
                }

                function createDocFragFn(s) {
                    let divEle = createElemFn(div),
                        docFrag = document[create + 'DocumentFragment'](),
                        childArr = [],
                        nodenameArr = [],
                        ele,
                        htmlStr = "";
                    if (stringFn(s)) {
                        divEle[innerHTML] = s;
                        while (ele = divEle[firstChild]) {
                            nodenameArr[push](lowercaseFn(ele[nodeName] || ""));
                            childArr[push](docFrag[append](ele));
                        }
                        return [childArr, docFrag, nodenameArr, s]; // [node(s), container, name(s), string]
                    }
                    for (let nodenameArr in s) {
                        if (!(ele = s[nodenameArr])) continue;
                        if (stringFn(ele)) {
                            htmlStr += ele;
                            divEle[innerHTML] = ele;
                            ele = divEle[firstChild];
                        } else {
                            htmlStr += ele[outerHtml];
                        }
                        childArr[push](lowercaseFn(ele[nodeName] || ""));
                        docFrag[append](ele);
                    }
                    return [s, docFrag, childArr, htmlStr]; // [node(s), container, name(s), string]
                }

                function insertAfter(newNode, existingNode) {
                    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
                }

                function cls_add(e, s) {
                    let c = e[className];
                    if (regPatternFn('(^|\\s)\\s*' + s + '\\s*(\\s|$)')[test](c)) {
                        return e;
                    }
                    return (e[className] = textFn(c + ' ' + s)), e;
                }

                function cls_rmv(e, s) {
                    let t = textFn(e[className][replace](regPatternFn('(^|\\s)\\s*' + s + '\\s*(\\s|$)', 'g'), '$1$2'));
                    return (t ? (e[className] = t) : e[removeAttribute]('class')), e;
                }

                function replaceElement(source, tagname) {
                    var range = document.createRange();
                    var element = createElemFn(tagname);
                    range.selectNodeContents(source);
                    element.append(range.extractContents());
                    source.parentNode.replaceChild(element, source);
                    setCursorAtEndOfContenteditable(element)
                }
                function setCursorAtEndOfContenteditable(contentEditableElement) {
                    var range, selection;
                    if (document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
                    {
                        range = document.createRange();//Create a range (a range is a like the selection but invisible)
                        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
                        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
                        selection = getSel();//get the selection object (allows you to change selection)
                        selection.removeAllRanges();//remove any selections already made
                        selection.addRange(range);//make the range you have just created the visible selection
                    }
                    else if (document.getSelection)//IE 8 and lower
                    {
                        // @ts-ignore
                        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
                        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
                        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
                        range.select();//Select the range (make it the visible selection
                    }
                }
                function getSel() {
                    $s = window[getSelection] && window[getSelection]() || {};
                    return $s[rangeCount] && $s || nul;
                }
                // get range
                function getRng(r) {
                    $s = getSel();
                    return $s && $s[getRangeAt](r || 0) || nul;
                }
                //
                function getAll(selector) {
                    var parent = arguments.length > 0 ? $options.parentElement : null;
                    if (!parent) {
                        parent = document;
                    }
                    return Array.prototype.slice.call(parent.querySelectorAll('.' + selector), 0);
                }

                function closeDropdowns() {
                    var $Editordropdowns = getAll(`${config.classes}` + '-dropdown');
                    $Editordropdowns.forEach(function ($el) {
                        $el.classList.remove('show-dropdown');
                    });
                }
                function openDropdown(event) {
                    event.stopPropagation();
                    let $this = this;
                    if (!$this.classList.contains('show-dropdown')) {
                        var $Editordropdowns = getAll(`${config.classes}` + '-dropdown');
                        $Editordropdowns.forEach(function ($el) {
                            $el.classList.remove('show-dropdown');
                        });
                    }
                    $this.classList.toggle('show-dropdown');
                }
                $this.dropdowncreate = function () {
                    // Editor Dropdowns
                    var $Editordropdowns = getAll(`${config.classes}` + '-dropdown');
                    if ($Editordropdowns.length > 0) {
                        $Editordropdowns.forEach(function ($el) {
                            addEvntLstnr($el, 'click', openDropdown);
                            $el.addEventListener('touchstart', openDropdown, { passive: true });
                        });
                        document.addEventListener(click, closeDropdowns);
                    }
                };

                function splitNode(selection, root) {
                    // Used to split the selected node into multiple selections.
                    let range = getRng();
                    let { firstChild, lastChild } = root;

                    let previousRange = document.createRange();
                    previousRange.setStartBefore(firstChild);
                    previousRange.setEnd(range.startContainer, range.startOffset);

                    let nextRange = document.createRange();
                    nextRange.setStart(range.endContainer, range.endOffset);
                    nextRange.setEndAfter(lastChild);

                    let currentSel = document.createRange();
                    currentSel.setStart(range.startContainer, range.startOffset);
                    currentSel.setEnd(range.endContainer, range.endOffset);
                    return {
                        previous: previousRange,
                        current: range,
                        next: nextRange,
                        selected: currentSel
                    };
                }

                function checkForParentTag(type) {
                    let sel = getSel();
                    let rng = getRng();
                    let clnRng = rng.cloneRange();
                    let startContainer = rng.startContainer;
                    let endContainer = rng.endContainer;
                    // Used to check for a parent tag in the current selection beforeend selections.


                    if (getSel()) {
                        let ele = rng.startContainer.parentElement.closest(config.tags) || config.tags['includes'](rng.startContainer);

                        if (ele) {
                            if (['left', 'right', 'center', 'justify']['includes'](type)) {
                                // Used for align the text.
                                if (['ul', 'ol']['includes'](ele.nodeName.toLowerCase())) {
                                    let rangeEle = getRng().commonAncestorContainer.parentElement.nodeName === 'LI' ? getRng().commonAncestorContainer.parentElement : getRng().commonAncestorContainer.parentElement.closest('li');
                                    rangeEle.style.textAlign = type;
                                }
                                else {
                                    if (rng.endContainer === rng.startContainer) {
                                        ele.style.textAlign = type;
                                    }
                                    else {
                                        let startContainer = rng.startContainer.parentNode;
                                        let endContainer = rng.endContainer.parentNode;
                                        while (startContainer && startContainer.nextElementSibling !== endContainer) {
                                            let element = startContainer.nextElementSibling;
                                            if (element) {
                                                element.style.textAlign = type;
                                            }

                                            startContainer = startContainer.nextElementSibling;
                                        }
                                        let newRng = document.createRange();
                                        // startContainer modification
                                        newRng.setStart(clnRng.startContainer, clnRng.startOffset);
                                        newRng.setEndAfter(clnRng.startContainer.parentElement.closest(config.tags));
                                        clnRng.startContainer.parentElement.closest(config.tags)['style'].textAlign = type;

                                        // endContainer modification
                                        newRng.setStart(clnRng.endContainer.parentElement.closest(config.tags), 0);
                                        newRng.setEnd(clnRng.endContainer, clnRng.endOffset);

                                        clnRng.endContainer.parentElement.closest(config.tags)['style'].textAlign = type;

                                        // restoring the range
                                        newRng.setStart(clnRng.startContainer, clnRng.startOffset);
                                        newRng.setEnd(clnRng.endContainer, clnRng.endOffset);

                                        sel.removeAllRanges();
                                        sel.addRange(newRng);
                                    }
                                }
                            }
                            else if (['quotes']['includes'](type)) {
                                // Used to toggle the blockquote for selected element.
                                const parent = ele.closest('blockquote');
                                if (rng.startContainer === rng.endContainer) {
                                    if (parent) {
                                        parent.replaceWith(...parent.childNodes);
                                        setCursorAtEndOfContenteditable(ele);
                                    }
                                    else {
                                        // `element` is the element you want to wrap
                                        var eleNode = ele.parentNode;
                                        let blockQuote = createElemFn('blockquote');
                                        // set the blockQuote as child (instead of the element)
                                        eleNode.replaceChild(blockQuote, ele);
                                        // set element as child of blockQuote
                                        blockQuote.append(ele);
                                        setCursorAtEndOfContenteditable(ele);
                                    }
                                }
                                else {
                                    let startContainer = rng.startContainer.parentNode;
                                    let endContainer = rng.endContainer.parentNode;
                                    let blockQuote = createElemFn('blockquote');

                                    let el = [];
                                    while (startContainer && startContainer.nextElementSibling !== endContainer) {
                                        let element = startContainer.nextElementSibling;
                                        el.push(element);
                                        startContainer = startContainer.nextElementSibling;
                                    }
                                    let newRng = document.createRange();

                                    // startContainer modification
                                    newRng.setStart(clnRng.startContainer, clnRng.startOffset);
                                    newRng.setEndAfter(clnRng.startContainer.parentElement.closest(config.tags));
                                    blockQuote.prepend(clnRng.startContainer.parentElement.closest(config.tags));

                                    el.forEach(e => {
                                        blockQuote.append(e)
                                    });

                                    // endContainer modification
                                    newRng.setStart(clnRng.endContainer.parentElement.closest(config.tags), 0);
                                    newRng.setEnd(clnRng.endContainer, clnRng.endOffset);
                                    blockQuote.append(clnRng.endContainer.parentElement.closest(config.tags));

                                    // restoring the range
                                    newRng.setStart(clnRng.startContainer, clnRng.startOffset);
                                    newRng.setEnd(clnRng.endContainer, clnRng.endOffset);
                                    newRng.insertNode(blockQuote)

                                }
                            }
                            else if (['p']['includes'](type)) {
                                // Used to convert the parent Element to para if not ul or ol
                                if (startContainer === endContainer) {
                                    if (ele.nodeName.toLowerCase() !== 'ul' && ele.nodeName.toLowerCase() !== 'ol' && ele.nodeName.toLowerCase() !== type) {
                                        replaceElement(ele, type);
                                    }
                                }
                                else {
                                    let startContainer = rng.startContainer.parentNode;
                                    let endContainer = rng.endContainer.parentNode;
                                    while (startContainer && startContainer.nextElementSibling !== endContainer) {
                                        let element = startContainer.nextElementSibling;
                                        replaceElement(element, type);
                                        startContainer = startContainer.nextElementSibling;
                                    }
                                    let newRng = document.createRange();
                                    // startContainer modification
                                    newRng.setStart(clnRng.startContainer, clnRng.startOffset);
                                    newRng.setEndAfter(clnRng.startContainer.parentElement.closest(config.tags));
                                    replaceElement(clnRng.startContainer.parentElement.closest(config.tags), type);

                                    // endContainer modification
                                    newRng.setStart(clnRng.endContainer.parentElement.closest(config.tags), 0);
                                    newRng.setEnd(clnRng.endContainer, clnRng.endOffset);
                                    replaceElement(clnRng.endContainer.parentElement.closest(config.tags), type);
                                }
                            }
                            else if (['ul', 'ol']['includes'](type)) {
                                // Used to convert the parent Element to ul or ol as per selected
                                if (!['ul', 'ol']['includes'](ele.nodeName.toLowerCase())) {
                                    let listType = createElemFn(type);
                                    let list;

                                    var range = document.createRange();

                                    range.selectNodeContents(ele);

                                    list = createElemFn('li');
                                    list.append(range.extractContents());
                                    listType.append(list);
                                    ele.parentNode.replaceChild(listType, ele);
                                    setCursorAtEndOfContenteditable(list)
                                }
                                else {
                                    if (type === ele.tagName.toLowerCase()) {
                                        // Used to remove the ul and li for the line which was focused if it was in ul previously

                                        let rangeEle = getRng().commonAncestorContainer;
                                        if (rangeEle.nodeType === 3) {
                                            rangeEle = rangeEle.parentElement;
                                        }

                                        // Used to get the holder(main container of element)
                                        let mainContainer = sel.anchorNode.parentElement.closest(config.tags);
                                        let ranges = splitNode(sel, mainContainer);
                                        if (ranges.current.commonAncestorContainer.nodeName.toLowerCase() === "li" || ranges.current.commonAncestorContainer.parentElement.nodeName.toLowerCase() === "li") {
                                            let newEle = ranges.current.startContainer.cloneNode();
                                            ranges.current.startContainer.parentElement.remove();
                                            let nextFragment = ranges.next.extractContents();
                                            if (nextFragment.textContent) {
                                                let tag = createElemFn(mainContainer.tagName.toLowerCase());
                                                insertAfter(tag, mainContainer);
                                                tag.append(nextFragment);
                                            }
                                            let p = createElemFn('p');
                                            p.append(newEle);
                                            insertAfter(p, mainContainer);
                                            setCursorAtEndOfContenteditable(p);
                                        }
                                    }
                                    else {
                                        // Used to replace ul or ol if it was present previously
                                        replaceElement(ele, type);
                                    }
                                }
                            }
                            else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6']['includes'](type['currentTarget']['firstChild']['title'])) {
                                // Used to convert p tag to h1-h6 as per selection.
                                if (startContainer === endContainer) {
                                    if (ele.nodeName.toLowerCase() !== 'ul' && ele.nodeName.toLowerCase() !== 'ol' && ele.nodeName.toLowerCase() !== type.currentTarget.firstChild.title) {
                                        replaceElement(ele, type.currentTarget.firstChild.title);
                                    }
                                }
                                else {
                                    let startContainer = rng.startContainer.parentNode;
                                    let endContainer = rng.endContainer.parentNode;
                                    while (startContainer && startContainer.nextElementSibling !== endContainer) {
                                        let element = startContainer.nextElementSibling;
                                        replaceElement(element, type.currentTarget.firstChild.title);
                                        startContainer = startContainer.nextElementSibling;
                                    }
                                    let newRng = document.createRange();

                                    // startContainer modification
                                    newRng.setStart(clnRng.startContainer, clnRng.startOffset);
                                    newRng.setEndAfter(clnRng.startContainer.parentElement.closest(config.tags));
                                    replaceElement(clnRng.startContainer.parentElement.closest(config.tags), type.currentTarget.firstChild.title);

                                    // endContainer modification
                                    newRng.setStart(clnRng.endContainer.parentElement.closest(config.tags), 0);
                                    newRng.setEnd(clnRng.endContainer, clnRng.endOffset);
                                    replaceElement(clnRng.endContainer.parentElement.closest(config.tags), type.currentTarget.firstChild.title);
                                }
                            }
                        }
                    }
                }
                function write() {
                    source$[textContent] = source$[textContent].trim();
                    if (source$[textContent]) {

                        source$[textContent] = source$[textContent].replaceAll(/<b>/g, '<strong>').replaceAll(/<\/b>/g, '</strong>').replaceAll(/<i>/g, '<em>').replaceAll(/<\/i>/g, '</em>').replaceAll(/<u>/g, '<ins>').replaceAll(/<\/u>/g, '</ins>').replaceAll(/<del>/g, '<s>').replaceAll(/<\/del>/g, '</s>').replaceAll(/<div>/g, '<strong>').replaceAll(/<\/div>/g, '</p>');
                        $view[innerHTML] = source$[textContent];

                        $container.classList.remove('show-placeholderText');
                    }
                    else {
                        $view[innerHTML] = `<p><br></p>`;
                        $container.classList.add('show-placeholderText');
                    }
                }
                function restoreSelection(range) {
                    if (range) {
                        if (window.getSelection) {
                            let sel = getSel();
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }
                    }
                }

                // Used to convert youtube video to embed
                function getYoutubeRefVal(url) {
                    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                    let match = url.match(regExp);

                    if (match && match[2].length == 11) {
                        return match[2];
                    } else {
                        return 'error';
                    }
                }
                // Used to convert dailtmotion video to embed
                function createDailyMotionEmbedLink(link) {
                    if (link.match(/(dai.ly)/)) {
                        link = link.replace("https://dai.ly/", "https://www.dailymotion.com/video/");
                    }
                    return link.replace("https://www.dailymotion.com/video/", "https://www.dailymotion.com/embed/video/");
                }

                function fileTag(Nametag) {
                    if (storedRange) {
                        restoreSelection(storedRange);
                    }
                    else {
                        $view.focus();
                    }
                    let current = getSel().anchorNode.parentElement.closest(config.tags);
                    if (current) {
                        let ranges = splitNode(document.getSelection(), current);
                        let nextFragment = ranges.next.extractContents();
                        let fileTag = createElemFn(current.tagName.toLowerCase());
                        fileTag.append(nextFragment);
                        if (fileTag.innerText) {
                            current.after(fileTag);
                        }
                        current.after(Nametag);
                        setCursorAtEndOfContenteditable(current)
                    }
                }
                // Local imgurl
                function encodeImageFileAsURL(element) {
                    let imgUrl,
                        file = element.files[0],
                        reader = new FileReader();
                    reader.onloadend = function () {
                        imgUrl = reader.result.toString();
                        if (imgUrl.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0].split('/')[0] === 'image') {
                            let imgBtn = createElemFn('img');
                            imgBtn.src = imgUrl;

                            fileTag(imgBtn)
                        }
                        else {
                            let videoFrame = document.createElement('iframe');
                            videoFrame.setAttribute('src', imgUrl);
                            videoFrame.setAttribute('title', 'videoFrame');
                            videoFrame.setAttribute('allowfullscreen', 'true');
                            videoFrame.setAttribute('frameborder', '0');
                            fileTag(videoFrame)
                        }
                    }
                    reader.readAsDataURL(file);
                }
                function submitVideoModal() {
                    let el = [...this.parentElement.previousElementSibling.children];
                    let srcValue;
                    if (el[0].querySelector('input').value) {
                        srcValue = el[0].querySelector('input').value;
                        if (/http/i.test(srcValue) || /https/i.test(srcValue)) {
                            let refrenceValue = srcValue;
                            if (srcValue.match('youtu')) {
                                refrenceValue = getYoutubeRefVal(srcValue);
                                let videoFrame = document.createElement('iframe');
                                videoFrame.setAttribute('src', `https://www.youtube.com/embed/${refrenceValue}`);
                                videoFrame.setAttribute('title', 'Youtuber link');
                                videoFrame.setAttribute('allowfullscreen', 'true');
                                videoFrame.setAttribute('frameborder', '0');
                                fileTag(videoFrame)

                            } else {
                                if (srcValue.match(/(dailymotion|dai.ly)/)) {
                                    refrenceValue = createDailyMotionEmbedLink(srcValue)
                                }
                                let videoFrame = document.createElement('iframe');
                                videoFrame.setAttribute('src', refrenceValue);
                                videoFrame.setAttribute('title', 'DailyMotion');
                                videoFrame.setAttribute('allowfullscreen', 'true');
                                videoFrame.setAttribute('frameborder', '0');
                                fileTag(videoFrame)
                                // https://www.dailymotion.com/embed/video/
                            }
                        }
                        else {
                            let errValue = el[0].querySelector('.url-error');
                            errValue.style.display = 'block';
                            setTimeout(function () {
                                errValue.style.display = 'none';
                            }, 1500)
                            return;
                        }
                    }
                    else {
                        srcValue = el[1].querySelector('input');
                        encodeImageFileAsURL(srcValue);
                    }
                    if ($modal.style.display !== 'none') {
                        $modal.style.display = 'none';
                        backDrop.style.display = 'none';
                        // el[0].querySelector('input').value = "";
                        // el[1].querySelector('input').value = "";
                    }
                }
                function submitModal() {
                    let el = [...this.parentElement.previousElementSibling.children];
                    let srcValue;
                    if (el[0].querySelector('input').value) {
                        srcValue = el[0].querySelector('input').value;
                        if (srcValue.match(/(http|https|data:image)/)) {
                            let imgBtn = createElemFn('img');
                            imgBtn.src = srcValue;
                            imgBtn.alt = 'img';
                            fileTag(imgBtn)
                        }
                        else {

                            let errValue = el[0].querySelector('.url-error');
                            errValue.style.display = 'block';
                            setTimeout(function () {
                                errValue.style.display = 'none';
                            }, 1500)
                            return;
                        }
                    }
                    else {
                        srcValue = el[1].querySelector('input');
                        encodeImageFileAsURL(srcValue);
                    }
                    if ($modal.style.display !== 'none') {
                        $modal.style.display = 'none';
                        backDrop.style.display = 'none';
                        // el[0].querySelector('input').value = "";
                        // el[1].querySelector('input').value = "";
                    }

                }


                function createButtonFn(title, clsName, configIconOpt, fn) {
                    if (!configIconOpt[2]) {
                        let atag = cls_add(createElemFn('a'), clsName),
                            configOpt = configIconOpt[1] || configIconOpt[0];
                        atag[innerHTML] = configOpt;
                        atag.title = title;
                        atag.href = 'javascript:;';
                        if (fn) {
                            let R = (e) => {
                                fn.call($this, e, atag),
                                    // copy(), 
                                    $view[focus](),
                                    (funcFn(c_update) && c_update.call($this, e, $view)),
                                    e[preventDefault]();
                            }
                            addEvntLstnr(atag, "touchstart", R);
                            addEvntLstnr(atag, "mousedown", R);
                        }
                        return [atag, fn];
                    }
                    else {
                        let div = cls_add(createElemFn('div'), `${clsName + " " + config.classes}-dropdown`),
                            button = createElemFn('button'),
                            configOpt = configIconOpt[1] || configIconOpt[0];
                        div.append(button);
                        button.classList.add(`${config.classes}-toggle`);
                        button.insertAdjacentHTML('afterbegin', configOpt);
                        button.insertAdjacentHTML('beforeend', arrowdown);

                        if (fn) {
                            let R = (e) => {
                                fn.call($this, e, div),
                                    $view[focus](),
                                    (funcFn(c_update) && c_update.call($this, e, $view)),
                                    e[preventDefault]();
                            }
                            addEvntLstnr(div, "touchstart", R);
                            addEvntLstnr(div, "mousedown", R);
                        }

                        let ul = createElemFn('ul');
                        ul.classList.add("button-dropdown-menu");
                        configIconOpt[2].forEach(e => {
                            let li = createElemFn('li');
                            let a = createElemFn('a');
                            // a.value = e;
                            a.tabIndex = -1;
                            a.href = "javascript:void(0)";
                            a.title = e;
                            a.textContent = e;
                            a.classList.add(`${config.classes}-dropdown-button`);
                            addEvntLstnr(li, click, checkForParentTag)
                            li.append(a);
                            ul.append(li);
                            if (fn) {
                                let R = (e) => {
                                    fn.call($this, e, a),
                                        // copy(), 
                                        $view[focus](),
                                        (funcFn(c_update) && c_update.call($this, e, $view)),
                                        e[preventDefault]();
                                }
                                addEvntLstnr(a, "touchstart", R);
                                addEvntLstnr(a, "mousedown", R);
                            }
                        });
                        div.append(ul);
                        return [div, fn];
                    }
                }
                function splitOn(bound, cutElement) {
                    // cutElement must be a descendant of bound
                    for (var parent = cutElement.parentNode; bound != parent; parent = grandparent) {
                        var right = parent.cloneNode(false);
                        while (cutElement.nextSibling)
                            right.append(cutElement.nextSibling);
                        var grandparent = parent.parentNode;
                        grandparent.insertBefore(right, parent.nextSibling);
                        grandparent.insertBefore(cutElement, right);
                    }
                }

                $this.eleFn = {};

                for (i in tools) {
                    $this.eleFn[i] = tools[i];
                    tools[i] = createButtonFn(c_toolsIcon[i][0] + (c_toolsIcon[i][2] ? ' (' + c_toolsIcon[i][2] + ')' : ""), c_class + '-t-' + i + ' ' + c_class + '-buttons', c_toolsIcon[i], tools[i]);
                    $this.eleFn[i].element = tools[i][0];
                }
                for (i in align) {
                    $this.eleFn[i] = align[i];
                    align[i] = createButtonFn(c_align[i][0] + (c_align[i][2] ? ' (' + c_align[i][2] + ')' : ""), c_class + '-t-' + i + ' ' + c_class + '-buttons', c_align[i], align[i]);
                    $this.eleFn[i].element = align[i][0];
                }
                for (i in typo) {
                    $this.eleFn[i] = typo[i];
                    typo[i] = createButtonFn(c_typo[i][0] + (c_typo[i][2] ? ' (' + c_typo[i][2] + ')' : ""), c_class + '-t-' + i + ' ' + c_class + '-buttons', c_typo[i], typo[i]);
                    $this.eleFn[i].element = typo[i][0];
                }
                for (i in attachment) {
                    $this.eleFn[i] = attachment[i];
                    attachment[i] = createButtonFn(c_attachment[i][0] + (c_attachment[i][2] ? ' (' + c_attachment[i][2] + ')' : ""), c_class + '-t-' + i + ' ' + c_class + '-buttons', c_attachment[i], attachment[i]);
                    $this.eleFn[i].element = attachment[i][0];
                }
                for (i in ref) {
                    $this.eleFn[i] = ref[i];
                    ref[i] = createButtonFn(c_ref[i][0] + (c_ref[i][2] ? ' (' + c_ref[i][2] + ')' : ""), c_class + '-t-' + i + ' ' + c_class + '-buttons', c_ref[i], ref[i]);
                    $this.eleFn[i].element = ref[i][0];
                }
                //setup before functions
                var typingTimer;
                function checkingInputOnKeyDown(e) {
                    if ($view && skipKeys(e)) {
                        if ($view.innerHTML === '<p><br></p>' && e.keyCode !== 8) {
                            $container.classList.remove('show-placeholderText');
                        }
                    }
                    clearTimeout(typingTimer);
                }
                function checkingInputOnKeyPressed(e) {

                    if (e.keyCode === 13) {
                        var range = getRng();
                        var element = range.commonAncestorContainer;
                        // Used to prevent the new p creation will after blockquote and go on
                        if (element.parentElement.nodeName == "BLOCKQUOTE") {
                            let newEle = element;
                            if (newEle !== element.parentElement.firstElementChild) {
                                insertAfter(newEle, element.parentElement);
                                setCursorAtEndOfContenteditable(newEle);
                            }
                        }

                    }
                }
                function checkingInputOnKeyUp(e) {
                    if (getSel()) {
                        if (e.keyCode === 8) {
                            if ($view.innerHTML === '<p><br></p>') {
                                return false;
                            } else if ($view.innerHTML === '') {
                                $view.innerHTML = '<p><br></p>';
                            }
                        }
                        if ($view && skipKeys(e)) {
                            if ($view.innerHTML === '<p><br></p>' || $view.innerHTML === '') {
                                $container.classList.add('show-placeholderText');
                            }
                        } else {
                            $container.classList.remove('show-placeholderText');
                        }
                        // Enter key
                        if (e.keyCode === 13) {
                            var range = getRng();
                            var element = range.commonAncestorContainer;
                            // Used to prevent the new p creation will after blockquote
                            if (element.parentElement.nodeName == "BLOCKQUOTE") {
                                let newEle = element;
                                insertAfter(newEle, element.parentElement);
                                setCursorAtEndOfContenteditable(newEle)
                            }
                        }

                        // Used to check the text contains the required tags
                        if (!getSel().anchorNode.parentNode.closest(config.tags)) {
                            // Used to conver the div tag to p tag
                            if (getSel().anchorNode.parentNode.closest('div') !== $view && getSel().anchorNode.parentNode.closest('div') !== $viewContainer) {
                                replaceElement(getSel().anchorNode.parentNode.closest('div'), 'p')
                            }
                            // Used to convert the text node to p tag
                            if (getSel().anchorNode.parentNode === $view && getSel().anchorNode.nodeType === 3) {
                                let p = createElemFn('p');
                                p.innerHTML = getSel().anchorNode.wholeText;
                                $view.append(p);
                                setCursorAtEndOfContenteditable(p)
                            }
                        }
                        // Used to convert all the div to p tag
                        if ($view.querySelector('div')) {
                            let div = $view.querySelectorAll('div');
                            div.forEach(e => replaceElement(e, 'p'))
                        }
                    }

                    clearTimeout(typingTimer);
                    typingTimer = setTimeout(doneTyping, 1000);
                }


                //user is "finished typing," do something
                function doneTyping() {
                    source$.innerHTML = $view.innerHTML;
                }

                function viewblur() {
                    update();
                    doneTyping();
                }

                cls_add($container, c_class + ' ' + view + ' ' + view + '-' + Math.floor(Math.random() * (999 - 1) + 1));
                cls_add($tools, c_class + '-tools');
                cls_add($align, c_class + '-align');
                cls_add($typo, c_class + '-typo');
                cls_add($attachment, c_class + '-attachment');
                cls_add($ref, c_class + '-ref');
                cls_add($options, c_class + '-options');
                cls_add($viewContainer, c_class + '-view-container');
                cls_add($view, c_class + '-' + view);
                cls_add($viewPlaceholder, c_class + '-' + view + '-placeholder');
                cls_add($sourcecode, c_class + '-' + source + 'code');

                function editor_create() {
                    if ($container[parentNode]) {
                        return $this; // If it was created already, skip!
                    }
                    cls_add(source$, c_class + '-' + source);
                    addEvntLstnr($view, 'keyup', checkingInputOnKeyUp);
                    addEvntLstnr($view, keydown, checkingInputOnKeyDown);
                    addEvntLstnr($view, keydown, checkingInputOnKeyPressed);

                    let toolsList = config.tools;
                    for (i in toolsList) {
                        i = toolsList[i];
                        if (tools[i]) {
                            $tools[append](tools[i][0]);
                        }
                    }
                    let alignList = config.align;
                    for (i in alignList) {
                        i = alignList[i];
                        if (align[i]) {
                            $align[append](align[i][0]);
                        }
                    }
                    let tyopList = config.typo;
                    for (i in tyopList) {
                        i = tyopList[i];
                        if (typo[i]) {
                            $typo[append](typo[i][0]);
                        }
                    }
                    let attachmentList = config.attachment;
                    for (i in attachmentList) {
                        i = attachmentList[i];
                        if (attachment[i]) {
                            $attachment[append](attachment[i][0]);
                        }
                    }
                    let refList = config.ref;
                    for (i in refList) {
                        i = refList[i];
                        if (ref[i]) {
                            $ref[append](ref[i][0]);
                        }
                    }
                    source$[parentNode][insertBefore]($container, source$);
                    $options[append]($tools, $align, $typo, $attachment, $ref);
                    $viewContainer[append]($view, $viewPlaceholder);
                    $container[append]($options, $viewContainer, $sourcecode, source$, $modal, backDrop);
                    cls_add($modal, c_class + '-' + modal);
                    cls_add(backDrop, c_class + '-modal-backdrop');
                    $modal.style.display = 'none';

                    $this.dropdowncreate();
                    //adding class to options container
                    $view.setAttribute(contentEditable, true);
                    $viewPlaceholder.innerHTML = $this.placeholderText;
                    let viewclientHt = $view.clientHeight;
                    let topPadding = 0, bottomPadding = 0;
                    if (getComputedStyle($view)) {
                        topPadding = Math.floor(Number(getComputedStyle($view).paddingTop.split('px')[0]));
                        bottomPadding = Math.floor(Number(getComputedStyle($view).paddingBottom.split('px')[0]));
                    }
                    $sourcecode.style.setProperty('height', (viewclientHt - topPadding - bottomPadding) + 'px');
                    write();
                    return $this;
                }

                function editor_destroy() {
                    if (!$container[parentNode]) {
                        return $this; // did destroy already, skip!
                    }
                    cls_rmv(source$, c_class + '-' + source);
                    rmvEvntLstnr($view, 'keyup', checkingInputOnKeyUp);
                    rmvEvntLstnr($view, keydown, checkingInputOnKeyDown);
                    rmvEvntLstnr($view, keydown, checkingInputOnKeyPressed);

                    //removing elements
                    $options.remove(); $viewContainer.remove(); $sourcecode.remove(); $modal.remove(); backDrop.remove();
                    let ele = $container.children[0];
                    insertAfter(ele, $container);
                    $container.remove();

                    write();
                    return $this;
                }
                // create
                $this[create] = editor_create;
                // destroy
                $this[destroy] = editor_destroy;
                // Creating the editor instance
                $this[create]();
                $view.onclick = update;
                $view.onkeydown = update;
                $view.onfocus = update;
                $view.onblur = viewblur;
                return $this;
            }
        }
        let ele;
        if (source$.length !== undefined) {
            [...source$].forEach(source$ => {
                return ele = new spkEditorFn(source$, options$)
            })
        }
        else {
            return ele = new spkEditorFn(source$, options$)
        }
        return ele;
    })
})(window, document, 'Spk');


