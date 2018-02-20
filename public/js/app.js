$(document).ready(function() {
    const queryURL = "https://api.coinmarketcap.com/v1/ticker/divi/?convert=USD"
    const mintedDivi = 6570000;
    const diviRewardSplit = mintedDivi * 0.45;

    let diamondNodes = $('#diamondNodes').val();
    let platinumNodes = $('#platinumNodes').val();
    let goldNodes = $('#goldNodes').val();
    let silverNodes = $('#silverNodes').val();
    let copperNodes = $('#copperNodes').val();

    let diamondPlusBonus = diamondNodes * 120000;
    let platinumPlusBonus = platinumNodes * 34500;
    let goldPlusBonus = goldNodes * 11000;
    let silverPlusBonus = silverNodes * 3150;
    let copperPlusBonus = copperNodes * 1000;
    let allNodesPlusBonus = diamondPlusBonus + platinumPlusBonus + goldPlusBonus + silverPlusBonus + copperPlusBonus;

    let diamondPerBlockReward = (diamondPlusBonus) / allNodesPlusBonus;
    let diamondRewardInDivi = (diamondPerBlockReward / diamondNodes) * diviRewardSplit;
    let diamondRewardInDollars;

    let platinumPerBlockReward = (platinumPlusBonus) / allNodesPlusBonus;
    let platinumRewardInDivi = (platinumPerBlockReward / platinumNodes) * diviRewardSplit;
    let platinumRewardInDollars;

    let goldPerBlockReward = (goldPlusBonus) / allNodesPlusBonus;
    let goldRewardInDivi = (goldPerBlockReward / goldNodes) * diviRewardSplit;
    let goldRewardInDollars;

    let silverPerBlockReward = (silverPlusBonus) / allNodesPlusBonus;
    let silverRewardInDivi = (silverPerBlockReward / silverNodes) * diviRewardSplit;
    let silverRewardInDollars;

    let copperPerBlockReward = (copperPlusBonus) / allNodesPlusBonus;
    let copperRewardInDivi = (copperPerBlockReward / copperNodes) * diviRewardSplit;
    let copperRewardInDollars;

    $('#mintedDivi').append(mintedDivi.toLocaleString('en'));
    
    console.log(`divi reward split: ${diviRewardSplit}`);
    console.log(`all nodes plus bonus: ${allNodesPlusBonus}`);
    
    console.log(`diamond per block reward: ${diamondPerBlockReward}`);
    console.log(`diamond reward in divi: ${diamondRewardInDivi}`);
    
    console.log(`platinum per block reward: ${platinumPerBlockReward}`);
    console.log(`platinum reward in divi: ${platinumRewardInDivi}`);
    
    console.log(`gold per block reward: ${goldPerBlockReward}`);
    console.log(`gold reward in divi: ${goldRewardInDivi}`);

    console.log(`silver per block reward: ${silverPerBlockReward}`);
    console.log(`silver reward in divi: ${silverRewardInDivi}`);
    
    console.log(`copper per block reward: ${copperPerBlockReward}`);
    console.log(`copper reward in divi: ${copperRewardInDivi}`);
    

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        let currentValue = response[0].price_usd;
        // slider
        $(function() {
            $("#slider-range-min").slider({
                range: "min",
                value: currentValue,
                min: 1,
                max: 700,
                slide: function(event, ui) {
                    $("#amount").val("$" + ui.value);

                    let diamondRewardInDollars = ui.value * diamondRewardInDivi;
                    let platinumRewardInDollars = ui.value * platinumRewardInDivi;
                    let goldRewardInDollars = ui.value * goldRewardInDivi;
                    let silverRewardInDollars = ui.value * silverRewardInDivi;
                    let copperRewardInDollars = ui.value * copperRewardInDivi;
                    
                    $('#diamondRewardInDollars').html(`$${diamondRewardInDollars.toLocaleString('en')}`);
                    $('#diamondRewardInDivi').html(`${diamondRewardInDivi.toLocaleString('en')}`);
                    
                    $('#platinumRewardInDollars').html(`$${platinumRewardInDollars.toLocaleString('en')}`);
                    $('#platinumRewardInDivi').html(`${platinumRewardInDivi.toLocaleString('en')}`);
                    
                    $('#goldRewardInDollars').html(`$${goldRewardInDollars.toLocaleString('en')}`);
                    $('#goldRewardInDivi').html(`${goldRewardInDivi.toLocaleString('en')}`);

                    $('#silverRewardInDollars').html(`$${silverRewardInDollars.toLocaleString('en')}`);
                    $('#silverRewardInDivi').html(`${silverRewardInDivi.toLocaleString('en')}`);
                    
                    $('#copperRewardInDollars').html(`$${copperRewardInDollars.toLocaleString('en')}`);
                    $('#copperRewardInDivi').html(`${copperRewardInDivi.toLocaleString('en')}`);
                }
            });
            $("#amount").val("$" + $("#slider-range-min").slider("value"));
        });
    });
    
})






