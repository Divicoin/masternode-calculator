jQuery(()=> {
    const queryURL = "https://api.coinmarketcap.com/v1/ticker/divi/?convert=USD"
    const mintedDivi = 6570000;
    const diviRewardSplit = mintedDivi * 0.45;

    var nodes = [
        {
            element: "#diamondNodes",
            reward: "#diamondReward",
            bonus:   120000
        },
        {
            element: "#platinumNodes",
            reward: "#platinumReward",
            bonus: 34500
        },
        {
            element: "#goldNodes",
            reward: "#goldReward",
            bonus: 11000
        },
        {
            element: "#silverNodes",
            reward: "#silverReward",
            bonus: 3150
        },
        {
            element: "#copperNodes",
            reward: "#copperReward",
            bonus: 1000
        }
    ];

    function calculateBonus() {
        Object.keys(nodes).forEach((i) => {
            let node = nodes[i];
            node._totalBonus = $(node.element).val() * node.bonus;
        });
    }

    function calculateTotalBonus() {
        result = 0;
        Object.keys(nodes).forEach((i) => {
            result += nodes[i]._totalBonus;
        });
        return result;
    }

    function calculateRewards() {
        let total = calculateTotalBonus();
        Object.keys(nodes).forEach((i) => {
            let node = nodes[i];
            node._blockReward = node._totalBonus / total;
            node._diviReward  = (node._blockReward / $(node.element).val()) * diviRewardSplit;
        });
    }

    function calculateDollars(price) {
        Object.keys(nodes).forEach((i) => {
            nodes[i]._dollarReward = (null == price ? 0 : Math.round(price) * nodes[i]._diviReward);
        })
    }

    function calculate(price) {
        calculateBonus();
        calculateRewards();
        calculateDollars(price);
    }

    function render() {
        nodes.forEach((node) => {
            $(node.reward + 'InDivi').html(node._diviReward.toLocaleString('en'));
            $(node.reward + 'InDollars').html('$' + node._dollarReward.toLocaleString('en'));
        });
    }

    $('#mintedDivi').append(mintedDivi.toLocaleString('en'));

    calculate();
    render();

    let currentValue = 0;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        currentValue = response[0].price_usd;

        calculate(currentValue);
        render();

        nodes.forEach((node) => {
            $(node.element).on('change', () => {
                calculate(currentValue);
                render();
            });
        });

        // slider
        $(function() {
            $("#slider-range-min").slider({
                range: "min",
                value: currentValue,
                min: 1,
                max: 700,
                slide: function(event, ui) {
                    currentValue = ui.value;
                    $("#amount").val(`$${ui.value}`);
                    calculate(currentValue);
                    render();
                }
            });
            $("#amount").val("$" + $("#slider-range-min").slider("value"));
        });
    });

})
