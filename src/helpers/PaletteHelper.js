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

    static gutermannPalette = [
        [// Black and white
            { name:'020', color: '#eeeced' },
            { name:'202', color: '#dae0e3' },
            { name:'010', color: '#0a0a0c' },
            { name:'120', color: '#09070a' }
        ],
        [// Jaune Orange
            { name:'400', color: '#cf2805' },
            { name:'460', color: '#d6680e' },
            { name:'461', color: '#b96a33' },
            { name:'462', color: '#cd5c04' },
            { name:'471', color: '#d55e38' },
            { name:'472', color: '#b44106' },
            { name:'474', color: '#a63b02' },
            { name:'476', color: '#a92d11' },
            { name:'569', color: '#a92702' },
            { name:'860', color: '#e97604' },
            { name:'863', color: '#e19343' },
            { name:'870', color: '#ca7f06' },
            { name:'807', color: '#f6dd84' },
            { name:'815', color: '#f8e5b6' },
            { name:'816', color: '#f7da87' },
            { name:'865', color: '#c4932a' },
            { name:'850', color: '#ecbd03' }
        ],
        [// Pink
            { name:'363', color: '#dd7650' },
            { name:'365', color: '#f2b197' },
            { name:'373', color: '#df4c4b' },
            { name:'300', color: '#e4c9cb' },
            { name:'305', color: '#eec8c4' },
            { name:'307', color: '#ecb3b4' },
            { name:'318', color: '#ce2376' },
            { name:'321', color: '#e77d8e' },
            { name:'324', color: '#b46060' },
            { name:'330', color: '#dc546f' },
            { name:'335', color: '#fb5b7a' },
            { name:'345', color: '#bc033e' },
            { name:'350', color: '#ca5758' },
            { name:'370', color: '#f5c2ad' },
            { name:'371', color: '#f1d1c5' },
            { name:'442', color: '#ba5457' },
            { name:'911', color: '#905357' },
            { name:'912', color: '#e0b2be' },
            { name:'936', color: '#af2c73' },
            { name:'938', color: '#930e51' },
            { name:'940', color: '#6f1749' },
            { name:'315', color: '#fbadba' }
        ],
        [// Violet
            { name:'263', color: '#382c56' },
            { name:'268', color: '#251635' },
            { name:'903', color: '#d0c0d8' },
            { name:'907', color: '#ad93b6' },
            { name:'909', color: '#caa8bb' },
            { name:'910', color: '#bf9da4' },
            { name:'925', color: '#764685' },
            { name:'926', color: '#9965a2' },
            { name:'927', color: '#7f3b7a' },
            { name:'928', color: '#591662' },
            { name:'930', color: '#775fa2' },
            { name:'933', color: '#5c567a' },
            { name:'935', color: '#554374' },
            { name:'939', color: '#422d39' },
            { name:'941', color: '#43233b' },
            { name:'942', color: '#643851' },
            { name:'943', color: '#45374e' },
            { name:'944', color: '#31214a' },
            { name:'948', color: '#593d4e' },
            { name:'945', color: '#4c2978' }
        ],
        [// Red
            { name:'325', color: '#8c3935' },
            { name:'326', color: '#862230' },
            { name:'347', color: '#b10126' },
            { name:'378', color: '#e84549' },
            { name:'390', color: '#ec2124' },
            { name:'393', color: '#bf3434' },
            { name:'395', color: '#ae2533' },
            { name:'405', color: '#d11b1e' },
            { name:'430', color: '#860423' },
            { name:'435', color: '#801f1a' },
            { name:'443', color: '#6a1527' },
            { name:'445', color: '#4d1120' },
            { name:'446', color: '#8d323c' },
            { name:'447', color: '#441825' },
            { name:'560', color: '#94402c' },
            { name:'570', color: '#852122' },
            { name:'937', color: '#682a42' },
            { name:'420', color: '#9e171c' },
            { name:'410', color: '#c51018' }
        ]
    ];

    static getDefaultColor(index) {
        return this.defaultPalette[index % this.defaultPalette.length];
    }

    static findColor(color) {
        if (!color) {
            return null;
        }
        for (let category of this.gutermannPalette) {
            const colorInPalette = category.find(c => c.color === color);
            if (colorInPalette)
                return colorInPalette;
        }
        return null;
    }

    static getColorByName(name) {
        if (!name) {
            return null;
        }
        for (let category of this.gutermannPalette) {
            const colorInPalette = category.find(c => c.name === name);
            if (colorInPalette)
                return colorInPalette;
        }
        return null;
    }
}
