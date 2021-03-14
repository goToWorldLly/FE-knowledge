function parse(jsonStr) {
    return eval('(' + jsonStr + ')');
}

function parse2(jsonStr) {
    return (new Function('return ' + jsonStr))();
}