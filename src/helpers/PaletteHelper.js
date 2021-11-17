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
            {name: '020', color: '#eeeced'},
            {name: '202', color: '#dae0e3'},
            {name: '102', color: '#c4c0c1'},
            {name: '070', color: '#d1c8c1'},
            {name: '518', color: '#afa89a'},
            {name: '110', color: '#9d9ca1'},
            {name: '127', color: '#8e9194'},
            {name: '114', color: '#847c7b'},
            {name: '010', color: '#0a0a0c'},
            {name: '120', color: '#09070a'}
        ],
        [// Jaune Orange
            {name: '815', color: '#f8e5b6'},
            {name: '816', color: '#f7da87'},
            {name: '807', color: '#f6dd84'},
            {name: '850', color: '#ecbd03'},
            {name: '865', color: '#c4932a'},
            {name: '863', color: '#e19343'},
            {name: '870', color: '#ca7f06'},
            {name: '860', color: '#e97604'},
            {name: '460', color: '#d6680e'},
            {name: '461', color: '#b96a33'},
            {name: '363', color: '#dd7650'},
            {name: '471', color: '#d55e38'},
            {name: '462', color: '#cd5c04'},
            {name: '373', color: '#df4c4b'},
            {name: '472', color: '#b44106'},
            {name: '474', color: '#a63b02'},
            {name: '476', color: '#a92d11'},
            {name: '569', color: '#a92702'}
        ],
        [// Red
            {name: '560', color: '#94402c'},
            {name: '325', color: '#8c3935'},
            {name: '326', color: '#862230'},
            {name: '395', color: '#ae2533'},
            {name: '435', color: '#801f1a'},
            {name: '570', color: '#852122'},
            {name: '446', color: '#8d323c'},
            {name: '393', color: '#bf3434'},
            {name: '378', color: '#e84549'},
            {name: '390', color: '#ec2124'},
            {name: '405', color: '#d11b1e'},
            {name: '400', color: '#cf2805'},
            {name: '410', color: '#c51018'},
            {name: '345', color: '#bc033e'},
            {name: '347', color: '#b10126'},
            {name: '420', color: '#9e171c'},
            {name: '430', color: '#860423'},
            {name: '443', color: '#6a1527'},
            {name: '445', color: '#4d1120'},
            {name: '447', color: '#441825'}
        ],
        [// Pink
            {name: '300', color: '#e4c9cb'},
            {name: '305', color: '#eec8c4'},
            {name: '371', color: '#f1d1c5'},
            {name: '370', color: '#f5c2ad'},
            {name: '365', color: '#f2b197'},
            {name: '307', color: '#ecb3b4'},
            {name: '912', color: '#e0b2be'},
            {name: '315', color: '#fbadba'},
            {name: '321', color: '#e77d8e'},
            {name: '324', color: '#b46060'},
            {name: '330', color: '#dc546f'},
            {name: '335', color: '#fb5b7a'},
            {name: '442', color: '#ba5457'},
            {name: '350', color: '#ca5758'},
            {name: '911', color: '#905357'},
            {name: '936', color: '#af2c73'},
            {name: '318', color: '#ce2376'},
            {name: '938', color: '#930e51'},
            {name: '940', color: '#6f1749'},
            {name: '937', color: '#682a42'}
        ],
        [// Violet
            {name: '900', color: '#b8b5c8'},
            {name: '903', color: '#d0c0d8'},
            {name: '909', color: '#caa8bb'},
            {name: '910', color: '#bf9da4'},
            {name: '907', color: '#ad93b6'},
            {name: '930', color: '#775fa2'},
            {name: '926', color: '#9965a2'},
            {name: '925', color: '#764685'},
            {name: '927', color: '#7f3b7a'},
            {name: '935', color: '#554374'},
            {name: '933', color: '#5c567a'},
            {name: '942', color: '#643851'},
            {name: '943', color: '#45374e'},
            {name: '952', color: '#443645'},
            {name: '948', color: '#593d4e'},
            {name: '945', color: '#4c2978'},
            {name: '928', color: '#591662'},
            {name: '263', color: '#382c56'},
            {name: '939', color: '#422d39'},
            {name: '941', color: '#43233b'},
            {name: '944', color: '#31214a'},
            {name: '268', color: '#251635'}
        ],
        [ //Turquoise
            {name: '700', color: '#afc0b4'},
            {name: '652', color: '#b7d4ca'},
            {name: '655', color: '#b1d3c3'},
            {name: '602', color: '#abc8c6'},
            {name: '601', color: '#9bd3d3'},
            {name: '607', color: '#8cc4c3'},
            {name: '673', color: '#219294'},
            {name: '670', color: '#34958c'},
            {name: '660', color: '#3e9585'},
            {name: '616', color: '#35a1b6'},
            {name: '615', color: '#3ba0b0'},
            {name: '211', color: '#468eb5'},
            {name: '621', color: '#2c7b90'},
            {name: '687', color: '#0b6679'},
            {name: '625', color: '#0a6087'},
            {name: '640', color: '#003c43'},
            {name: '784', color: '#112428'}
        ],
        [ //Blue
            {name: '203', color: '#c3d2d9'},
            {name: '206', color: '#c3dfe9'},
            {name: '207', color: '#cbd7e3'},
            {name: '600', color: '#b1d8da'},
            {name: '209', color: '#abccdf'},
            {name: '618', color: '#97c8ce'},
            {name: '227', color: '#98a7b8'},
            {name: '610', color: '#65aebb'},
            {name: '218', color: '#57739a'},
            {name: '215', color: '#5c7a9c'},
            {name: '233', color: '#566582'},
            {name: '236', color: '#495b73'},
            {name: '635', color: '#405c69'},
            {name: '620', color: '#578c9b'},
            {name: '619', color: '#4e91a7'},
            {name: '212', color: '#5e8ab4'},
            {name: '230', color: '#3c5b7e'},
            {name: '237', color: '#38465b'},
            {name: '245', color: '#0d619e'},
            {name: '254', color: '#243d5c'},
            {name: '248', color: '#034482'},
            {name: '251', color: '#002a66'},
            {name: '260', color: '#12285b'},
            {name: '257', color: '#052960'},
            {name: '637', color: '#203a4b'},
            {name: '241', color: '#042943'},
            {name: '239', color: '#29314c'},
            {name: '638', color: '#1c252a'},
            {name: '252', color: '#1b1d47'},
            {name: '275', color: '#1a213b'},
            {name: '266', color: '#181f34'},
            {name: '276', color: '#0e2038'},
            {name: '639', color: '#171e24'},
            {name: '272', color: '#121426'}
        ],
        [// Green
            {name: '704', color: '#b6cd93'},
            {name: '710', color: '#8bb96e'},
            {name: '728', color: '#76b370'},
            {name: '745', color: '#168968'},
            {name: '720', color: '#389451'},
            {name: '760', color: '#257d45'},
            {name: '752', color: '#045c38'},
            {name: '777', color: '#365545'},
            {name: '770', color: '#2b4126'},
            {name: '785', color: '#0e4633'},
            {name: '748', color: '#08472c'},
            {name: '788', color: '#133829'},
            {name: '642', color: '#2c4645'},
            {name: '644', color: '#242f29'},
            {name: '790', color: '#2b3d3f'},
            {name: '794', color: '#1b2926'}
        ],
        [ //Green Yellow
            {name: '521', color: '#cfd7bd'},
            {name: '702', color: '#d5d9af'},
            {name: '721', color: '#b3b089'},
            {name: '723', color: '#8d9f85'},
            {name: '712', color: '#d8cf5b'},
            {name: '716', color: '#a0c55a'},
            {name: '711', color: '#969c2c'},
            {name: '776', color: '#6d7a47'},
            {name: '768', color: '#5a7241'},
            {name: '779', color: '#48563e'},
            {name: '775', color: '#7b7047'},
            {name: '714', color: '#7f6824'},
            {name: '780', color: '#40421d'},
            {name: '764', color: '#323c30'},
            {name: '793', color: '#25251a'}
        ],
        [ //Grey
            {name: '100', color: '#cbc4c1'},
            {name: '220', color: '#b6c4d3'},
            {name: '774', color: '#76725d'},
            {name: '115', color: '#58565b'},
            {name: '766', color: '#484b3e'},
            {name: '524', color: '#a69285'},
            {name: '117', color: '#4c505f'},
            {name: '116', color: '#464243'},
            {name: '791', color: '#4c4541'},
            {name: '725', color: '#a8b6a1'},
            {name: '724', color: '#8ca394'},
            {name: '722', color: '#b5aea3'},
            {name: '650', color: '#a8bfb7'},
            {name: '648', color: '#a6aca2'},
            {name: '646', color: '#525f5d'},
            {name: '586', color: '#78655e'},
            {name: '585', color: '#645349'},
            {name: '582', color: '#514038'},
            {name: '526', color: '#907a6c'},
            {name: '517', color: '#beb2a4'},
            {name: '515', color: '#a0917e'},
            {name: '224', color: '#8e96a2'},
            {name: '128', color: '#7b8e93'},
            {name: '126', color: '#6c757a'},
            {name: '125', color: '#282224'},
            {name: '113', color: '#5a5358'},
            {name: '112', color: '#6e6463'},
            {name: '111', color: '#57545b'},
            {name: '238', color: '#222a37'},
            {name: '118', color: '#15161f'},
            {name: '280', color: '#15161a'},
            {name: '279', color: '#150f19'},
            {name: '278', color: '#0b1018'}
        ],
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
