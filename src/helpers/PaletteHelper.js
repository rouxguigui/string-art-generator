export default class PaletteHelper {
    static defaultPalette = [`#051f24`, `#1d758a`, `#036074`, `#5b93a3`, `#3587a3`, `#3aa1aa`, `#93cccc`, `#8eb1af`, `#88babf`];

    static getDefaultColor(index) {
        return this.defaultPalette[index % this.defaultPalette.length];
    }
}
