export function generateGuid() {
    return "$" + ("0000000" + (Math.random() * Math.pow(36, 7) << 0).toString(36)).substr(-7);
}


export function roundTo1(value) {
    return Math.round(value * 10) / 10;
}

export default {};
