var textTyping = function (o) {

    var target = gid(o.id) || gcl(o.cl) || gtn(o.tn) || o.el,
        delay = o.delay || ( o.delay === 0 ? 0 : 1000),
        fps = o.fps || 120,
        text = o.text || '',
        cursor = o.cursor || false,
        justDeleteIt = o.justDeleteIt || false,
        deleteCursorIn = o.deleteCursorIn || ( o.deleteCursorIn === 0 ? 0 : 1000),
        deleteIt = o.deleteIt || false,
        deleteIn = o.deleteIn || ( o.deleteIn === 0 ? 0 : 1000),
        deleteTo = o.deleteTo || '';

    function checkForBreaks(val) {
        var breaks = val.match(/<br>|<br\/>/g),
            before,
            after,
            arrBr = [];

        if (val !== '' && val !== null && breaks !== null) {
            for (var i = 0; i <= breaks.length; i++) {
                if (val.match(/.*?(?=<)/)) {
                    before = val.match(/.*?(?=<)/)[0].split('');
                    for (var j = 0; j < before.length; j++) {
                        arrBr.push(before[j]);
                    }
                    arrBr.push('<br/>');
                }
                if (i === breaks.length) {
                    if (val.match(/r>.*|\/>.*/)) {
                        after = val.match(/r>.*|\/>.*/)[0].substring(2).split('');
                    } else {
                        after = val.split('');
                    }
                    for (var k = 0; k < after.length; k++) {
                        arrBr.push(after[k]);
                    }
                } else {
                    after = val.match(/r>.*|\/>.*/)[0].substring(2);
                    val = after;
                }
            }
            return arrBr;
        } else {
            return val.split('');
        }
    }

    function deleteCursor(target, deleteCursorIn, deleteArray) {
        return animationTimeout(function() {
            if (deleteIt && cursor) {
                if (o.id || o.el) {
                    while (target.firstChild) {
                        target.removeChild(target.firstChild);
                    }
                } else {
                    for (var l = 0; l < target.length; l++) {
                        if (deleteArray.length === 0) {
                            while (target[l].firstChild) {
                                target[l].removeChild(target[l].firstChild);
                            }
                        } else {
                            target[l].removeChild(target[l].firstChild.nextSibling);
                        }
                    }
                }
            } else {
                if (o.id || o.el) {
                    target.removeChild(target.firstChild.nextSibling);
                } else {
                    for (var m = 0; m < target.length; m++) {
                        target[m].removeChild(target[m].firstChild.nextSibling);
                    }
                }
            }
        }, deleteCursorIn);
    }

    function addText(textArray, counter, deleteIt) {
        if (deleteIt) {
            textArray.splice(counter, 1);
            if (o.id || o.el) {
                target.firstChild.innerHTML = textArray.join('');
            } else {
                for (var n = 0; n < target.length; n++) {
                    target[n].firstChild.innerHTML = textArray.join('');
                }
            }
        } else {
            if (o.id || o.el) {
                target.firstChild.innerHTML += textArray[counter];
            } else {
                for (var p = 0; p < target.length; p++) {
                    target[p].firstChild.innerHTML += textArray[counter];
                }
            }
        }
    }

    return animationTimeout(function() {

        if (justDeleteIt === false) { target.innerHTML = ''; }
        var textCon = document.createElement('SPAN');

        if (o.id || o.el) {
            target.appendChild(textCon);
        } else {
            for (var q = 0; q < target.length; q++) {
                textCon[q] = document.createElement('SPAN');
                target[q].appendChild(textCon[q]);
            }
        }

        if (cursor) {
            var span = document.createElement('SPAN'),
                setCursor = document.createTextNode('|'),
                opacityCounter = 0;

            if (o.id || o.el) {
                span.appendChild(setCursor);
                target.appendChild(span);
            } else {
                for (var r = 0; r < target.length; r++) {
                    span[r] = document.createElement('SPAN');
                    setCursor[r] = document.createTextNode('|');
                    span[r].appendChild(setCursor[r]);
                    target[r].appendChild(span[r]);
                }
            }

            var cursorBlink = animationInterval(function() {
                opacityCounter++;
                if (o.id || o.el) {
                    if (target.childNodes.length > 1) {
                        if (opacityCounter % 2 === 0) {
                            target.firstChild.nextSibling.style.opacity = 0;
                        } else {
                            target.firstChild.nextSibling.style.opacity = 1;
                        }
                    } else {
                        if (!window.cancelAnimationFrame) {
                            clearAnimationInterval(cursorBlink);
                        }
                        return true;
                    }
                } else {
                    for (var s = 0; s < target.length; s++) {
                        if (target[s].childNodes.length > 1) {
                            if (opacityCounter % 2 === 0) {
                                target[s].firstChild.nextSibling.style.opacity = 0;
                            } else {
                                target[s].firstChild.nextSibling.style.opacity = 1;
                            }
                        } else {
                            if (!window.cancelAnimationFrame) {
                                clearAnimationInterval(cursorBlink);
                            }
                            return true;
                        }
                    }
                }
            }, 500);
        }

        var textArray = checkForBreaks(text),
            loopCounter = -1,
            deleteArray = checkForBreaks(deleteTo),
            deleteCounter = textArray.length;

        var frameLooper = animationInterval(function() {
            loopCounter++;
            if (loopCounter === textArray.length && justDeleteIt === false) {
                if (deleteIt === false && cursor) {
                    deleteCursor(target, deleteCursorIn, deleteArray);
                } else if (deleteIt && cursor) {
                    animationTimeout(function() {
                        var deleteText = animationInterval(function() {
                            deleteCounter--;
                            if (deleteCounter < deleteArray.length) {
                                deleteCursor(target, deleteCursorIn, deleteArray);
                                if (!window.cancelAnimationFrame) {
                                    clearAnimationInterval(deleteText);
                                }
                                return true;
                            } else {
                                addText(textArray, deleteCounter, true);
                            }
                            return false;
                        }, fixValue(1000 / fps, 0));
                    }, deleteIn);
                }
                if (!window.cancelAnimationFrame) {
                    clearAnimationInterval(frameLooper);
                }
                return true;
            } else {
                if (justDeleteIt) {
                    if (cursor) {
                        deleteCounter--;
                        if (deleteCounter < deleteArray.length) {
                            deleteCursor(target, deleteCursorIn, deleteArray);
                        } else {
                            addText(textArray, deleteCounter, true);
                        }
                        return false;
                    } else {
                        animationTimeout(function() {
                            var deleteText = animationInterval(function() {
                                deleteCounter--;
                                if (deleteCounter < deleteArray.length) {
                                    if (!window.cancelAnimationFrame) {
                                        clearAnimationInterval(deleteText);
                                    }
                                    return true;
                                } else {
                                    addText(textArray, deleteCounter, true);
                                }
                                return false;
                            }, fixValue(1000 / fps, 0));
                        }, deleteIn);
                        if (!window.cancelAnimationFrame) {
                            clearAnimationInterval(frameLooper);
                        }
                        return true;
                    }
                } else {
                    addText(textArray, loopCounter, false);
                }
            }
            return false;
        }, fixValue(1000 / fps, 0));
    }, delay);
};
