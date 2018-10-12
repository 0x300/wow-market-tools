const
    fs = require('fs')

const tsmItemData = JSON.parse(fs.readFileSync('./tsm-data-dump.json', 'utf8'))

// Item groups
const bfaHerbItems = [{
    "Id": 152505,
    "Name": "Riverbud",
}, {
    "Id": 152506,
    "Name": "Star Moss",
}, {
    "Id": 152507,
    "Name": "Akunda's Bite",
}, {
    "Id": 152508,
    "Name": "Winter's Kiss",
}, {
    "Id": 152509,
    "Name": "Siren's Pollen",
}, {
    "Id": 152510,
    "Name": "Anchor Weed",
}, {
    "Id": 152511,
    "Name": "Sea Stalk",
}]

// Helpers
const getItemIds = (items) => {
    return items.map((item) => {
        return item.Id
    })
}

const filterBfaHerbs = (items) => {
    return items.filter((item) => {
        return getItemIds(bfaHerbItems).includes(item.Id)
    })
}

const sortItemsByField = (items = [], field = 'MarketValue') => {
    return items.sort((item1, item2) => {
        return item1[field] < item2[field]
    })
}

const getItemRegionalRevenue = (item) => {
    return formatGold(item.MarketValue * item.RegionAvgDailySold);
}

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const formatGold = (copper) => {
    return numberWithCommas(Math.floor(copper/10000)) + 'g'
}

const herbData = filterBfaHerbs(tsmItemData);

// sortItemsByField(herbData)
const items = sortItemsByField(herbData, 'RegionAvgDailySold')
items.forEach((item) => {
    console.log(`${item.Name}: ${getItemRegionalRevenue(item)}`)
})
