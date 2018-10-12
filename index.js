const
    { loadJSON } = require('./helpers'),
    { bfaHerbs } = require('./itemGroups');

const tsmItemData = loadJSON('./tsm-data-dump.json');

// Helpers
const getItemIds = (items) => {
    return items.map((item) => {
        return item.Id;
    });
};

const filterByItemGroup = (items, itemGroup) => {
    return items.filter((item) => {
        return getItemIds(itemGroup).includes(item.Id);
    });
};

const sortItemsByField = (items = [], field = 'MarketValue') => {
    return items.sort((item1, item2) => {
        return item1[field] < item2[field];
    });
};

const getItemRegionalRevenue = (item) => {
    return formatGold(item.MarketValue * item.RegionAvgDailySold);
};

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatGold = (copper) => {
    return numberWithCommas(Math.floor(copper/10000)) + 'g';
};

const herbData = filterByItemGroup(tsmItemData, bfaHerbs);

// sortItemsByField(herbData)
const items = sortItemsByField(herbData, 'RegionAvgDailySold');

items.forEach((item) => {
    console.log(`${item.Name}: ${getItemRegionalRevenue(item)}`);
});
