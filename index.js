var postcss = require('postcss')
var specificity = require('css-specificity')

module.exports = plot

function plot (css) {
    var data = calc(css)
    data.forEach(function (datum) {
        var plot = []
        var selector = datum.selector
        if (datum.important) selector = '\033[31m' + datum.selector + '\033[39m'
        console.log(selector + ':')
        for (var i = 0; i < datum.val; i++) {
            plot.push('■')
        }
        console.log(plot.join(''))
    })
}

function parse (css) {
    return postcss.parse(css)
}

function calc (css) {
    var data = []
    var root = parse(css)
    root.eachRule(function (rule) {
        var ruleSpecificities = specificity.calc(rule.selector)
        ruleSpecificities.forEach(function (specificity) {
            data.push({
                selector: specificity.selector,
                important: useImportant(rule),
                val: toPlotVal(specificity),
                line: rule.source.start.line
            })
        })
    })
    return data
}

function toPlotVal (specificity) {
    return 100 * specificity.a + 10 * specificity.b + specificity.c
}

function useImportant (rule) {
    var ret = false;
    rule.nodes.forEach(function (decl) {
        if (decl.type === 'decl' && decl.important) ret = true
    })
    return ret
}
