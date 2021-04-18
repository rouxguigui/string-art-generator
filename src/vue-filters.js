import Vue from "vue";

export function date(value) {
    if (!value)
        return `-`;
    return new Date(value).toDateString();
}

Vue.filter(`date`, date);

Vue.filter(`number`, function(value) {
    if (value > 0 || value < 0)
        return (+value).toLocaleString();
    return '-';
});

// Vue.filter(`number`, function(value) {
//     if (isNullOrUndefined(value))
//         return `-`;
//     return formatNumber(+value);
// });
//
// Vue.filter(`percentage`, function(value) {
//     if (isNullOrUndefined(value))
//         return `-`;
//     return (parseFloat(value) * 100).toPrecision(2) + `%`;
// });

export default {};
