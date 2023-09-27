module.exports = function (source) {

    // const blocks = source.split(/<\/?code.*?>/);
    const blocks = source.split("```");
    const codeBlocks = [];

    for (let i = 1; i < blocks.length; i = i + 2) {
        let strFile = blocks[i].substring(0, blocks[i].indexOf('\n'));
        if (strFile === 'ts' || strFile === 'typescript') {
            codeBlocks.push(blocks[i].substring(blocks[i].indexOf('\n') + 1));
        }
    }

    return codeBlocks.join('\n\n');

};
