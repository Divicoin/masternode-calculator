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
            bonus:   120000,
            costElement: '#diamondCost',
            cost: 100000
        },
        {
            element: "#platinumNodes",
            reward: "#platinumReward",
            bonus: 34500,
            costElement: '#platinumCost',
            cost: 30000
        },
        {
            element: "#goldNodes",
            reward: "#goldReward",
            bonus: 11000,
            costElement: '#goldCost',
            cost: 10000
        },
        {
            element: "#silverNodes",
            reward: "#silverReward",
            bonus: 3150,
            costElement: '#silverCost',
            cost: 3000
        },
        {
            element: "#copperNodes",
            reward: "#copperReward",
            bonus: 1000,
            costElement: '#copperCost',
            cost: 1000
        }
    ];

    const lotteryTokens = 262080 // Tokens reserved for lottery blocks

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

        currentValue = response[0].price_usd;

        nodes.forEach((node) => {
            let nodeCost = Math.floor(currentValue * node.cost);
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
                min: 1,
                max: 200,
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
