jQuery(()=> {
    const queryURL = "https://api.coinmarketcap.com/v1/ticker/divi/?convert=USD"
    const nodeCountUrl = "/nodecounts";
    const seeSaw =
        {
            mintedDivi: "#mintedDivi",
            split: "#seeSawSplit"
        };
    
    let diviRewardSplitSolution;

    var nodes = [
        {
            element: "#diamondNodes",
            reward: "#diamondReward",
            bonus: 12000000,
            costElement: '#diamondCost',
            cost: 10000000
        },
        {
            element: "#platinumNodes",
            reward: "#platinumReward",
            bonus: 3450000,
            costElement: '#platinumCost',
            cost: 3000000
        },
        {
            element: "#goldNodes",
            reward: "#goldReward",
            bonus: 1100000,
            costElement: '#goldCost',
            cost: 1000000
        },
        {
            element: "#silverNodes",
            reward: "#silverReward",
            bonus: 315000,
            costElement: '#silverCost',
            cost: 300000
        },
        {
            element: "#copperNodes",
            reward: "#copperReward",
            bonus: 100000,
            costElement: '#copperCost',
            cost: 100000
        }
    ];

    const lotteryTokens = 26208000 // Tokens reserved for lottery blocks

    function diviRewardSplit() {
        diviRewardSplitSolution = ($(seeSaw.mintedDivi).val() - lotteryTokens) * ($(seeSaw.split).val() / 100);
        $('#seeSawSplitSolution').html(diviRewardSplitSolution.toLocaleString());
        return diviRewardSplitSolution;
    }
    diviRewardSplit();

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
            node._diviReward  = (node._blockReward / $(node.element).val()) * diviRewardSplitSolution;
        });
    }

    function calculateDollars(price) {
        Object.keys(nodes).forEach((i) => {
            nodes[i]._dollarReward = (null == price ? 0 : price * nodes[i]._diviReward);
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
            $(node.costElement + 'InDivi').html(node.cost.toLocaleString('en'));
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
      $.ajax({
        url: nodeCountUrl,
        method: "GET"
      }).done((res2) => {
        console.log('response!', res2);
        $("#diamondNodes").val(res2.diamondnodes);
        $("#platinumNodes").val(res2.platinumnodes);
        $("#goldNodes").val(res2.goldnodes);
        $("#silverNodes").val(res2.silvernodes);
        $("#copperNodes").val(res2.coppernodes);

        currentValue = Math.round(response[0].price_usd / 100 * 100) / 100;

        nodes.forEach((node) => {
            let nodeCost = currentValue * node.cost;
            $(node.costElement + 'InDollars').html(`$${nodeCost.toLocaleString('en')}`)
        })
        
        calculate(currentValue);
        render();

        nodes.forEach((node) => {
            $(node.element).on('change', () => {
                calculate(currentValue);
                render();
            });
            $(seeSaw.split).on('change', () => {
                diviRewardSplit();
                calculate(currentValue);
                render();
            });
            $(seeSaw.mintedDivi).on('change', () => {
                diviRewardSplit();
                calculate(currentValue);
                render();
            })
        });

        // slider
        $(function() {
            $("#slider-range-min").slider({
                range: "min",
                value: currentValue,
                min: 0.01,
                max: 2.00,
                step: 0.01,
                animate: true,
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
  });
})
