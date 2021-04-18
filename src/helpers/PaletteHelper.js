export default class PaletteHelper {
    static defaultPalette = [`#051f24`, `#1d758a`, `#036074`, `#5b93a3`, `#3587a3`, `#3aa1aa`, `#93cccc`, `#8eb1af`, `#88babf`];

    static basicPalette = [
        "#ffffff", "#f3f3f3", "#efefef", "#d9d9d9", "#cccccc", "#b7b7b7", "#999999", "#666666", "#434343", "#000000",
        "#f4cccc", "#e6b8af", "#fce5cd", "#fff2cc", "#d9ead3", "#c5dee2", "#c9daf8", "#cfe2f3", "#d9d2e9", "#ead1dc",
        "#ea9999", "#dd7e6b", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#a4c2f4", "#9fc5e8", "#b4a7d6", "#d5a6bd",
        "#e06666", "#cc4125", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6d9eeb", "#6fa8dc", "#8e7cc3", "#c27ba0",
        "#cc0000", "#a61c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3c78d8", "#3d85c6", "#674ea7", "#a64d79",
        "#990000", "#85200c", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#1155cc", "#0b5394", "#351c75", "#741b47",
        "#660000", "#5b0f00", "#783f04", "#7f6000", "#274e13", "#0c343d", "#1c4587", "#073763", "#20124d", "#4c1130",
        "#ff0000", "#980000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#4a86e8", "#0000ff", "#9900ff", "#ff00ff"
    ]

    static getDefaultColor(index) {
        return this.defaultPalette[index % this.defaultPalette.length];
    }
}
