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
    
    $('#diamondRewardInDivi').html(`${diamondRewardInDivi.toLocaleString('en')}`);
    $('#platinumRewardInDivi').html(`${platinumRewardInDivi.toLocaleString('en')}`);
    $('#goldRewardInDivi').html(`${goldRewardInDivi.toLocaleString('en')}`);
    $('#silverRewardInDivi').html(`${silverRewardInDivi.toLocaleString('en')}`);
    $('#copperRewardInDivi').html(`${copperRewardInDivi.toLocaleString('en')}`);
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        let currentValue = response[0].price_usd;

        let diamondRewardInDollars = Math.round(currentValue) * diamondRewardInDivi;
        $('#diamondRewardInDollars').html(`$${diamondRewardInDollars.toLocaleString('en')}`);

        let platinumRewardInDollars = Math.round(currentValue) * platinumRewardInDivi;
        $('#platinumRewardInDollars').html(`$${platinumRewardInDollars.toLocaleString('en')}`);

        let goldRewardInDollars = Math.round(currentValue) * goldRewardInDivi;
        $('#goldRewardInDollars').html(`$${goldRewardInDollars.toLocaleString('en')}`);

        let silverRewardInDollars = Math.round(currentValue) * silverRewardInDivi;
        $('#silverRewardInDollars').html(`$${silverRewardInDollars.toLocaleString('en')}`);

        let copperRewardInDollars = Math.round(currentValue) * copperRewardInDivi;
        $('#copperRewardInDollars').html(`$${copperRewardInDollars.toLocaleString('en')}`);
        
        function changeRewards() {
            $('#diamondNodes').change(function() {
                $('#diamondNodes').val($(this).val());
                let diamondNodes = $('#diamondNodes').val();
                 
                let diamondPlusBonus = diamondNodes * 120000;
                let platinumPlusBonus = platinumNodes * 34500;
                let silverPlusBonus = silverNodes * 3150;
                let goldPlusBonus = goldNodes * 11000;
                let copperPlusBonus = copperNodes * 1000;
                let allNodesPlusBonus = diamondPlusBonus + platinumPlusBonus + goldPlusBonus + silverPlusBonus + copperPlusBonus;
                
                let diamondPerBlockReward = (diamondPlusBonus) / allNodesPlusBonus;
                let platinumPerBlockReward = (platinumPlusBonus) / allNodesPlusBonus;
                let goldPerBlockReward = (goldPlusBonus) / allNodesPlusBonus;
                let silverPerBlockReward = (silverPlusBonus) / allNodesPlusBonus;
                let copperPerBlockReward = (copperPlusBonus) / allNodesPlusBonus;
                
                let diamondRewardInDivi = (diamondPerBlockReward / diamondNodes) * diviRewardSplit;
                let platinumRewardInDivi = (platinumPerBlockReward / platinumNodes) * diviRewardSplit;
                let goldRewardInDivi = (goldPerBlockReward / goldNodes) * diviRewardSplit;
                let silverRewardInDivi = (silverPerBlockReward / silverNodes) * diviRewardSplit;
                let copperRewardInDivi = (copperPerBlockReward / copperNodes) * diviRewardSplit;
                
                $('#diamondRewardInDivi').html(diamondRewardInDivi.toLocaleString('en'));
                $('#platinumRewardInDivi').html(platinumRewardInDivi.toLocaleString('en'));
                $('#goldRewardInDivi').html(goldRewardInDivi.toLocaleString('en'));
                $('#silverRewardInDivi').html(silverRewardInDivi.toLocaleString('en'));
                $('#copperRewardInDivi').html(copperRewardInDivi.toLocaleString('en'));
    
                let diamondRewardInDollars = currentValue * diamondRewardInDivi;
                let platinumRewardInDollars = currentValue * platinumRewardInDivi;
                let goldRewardInDollars = currentValue * goldRewardInDivi;
                let silverRewardInDollars = currentValue * silverRewardInDivi;
                let copperRewardInDollars = currentValue * copperRewardInDivi;
                
                $('#diamondRewardInDollars').html(`$${diamondRewardInDollars.toLocaleString('en')}`);
                $('#platinumRewardInDollars').html(`$${platinumRewardInDollars.toLocaleString('en')}`);
                $('#goldRewardInDollars').html(`$${goldRewardInDollars.toLocaleString('en')}`);
                $('#silverRewardInDollars').html(`$${silverRewardInDollars.toLocaleString('en')}`);
                $('#copperRewardInDollars').html(`$${copperRewardInDollars.toLocaleString('en')}`);    
            });
            
            $('#platinumNodes').change(function() {
                $('#platinumNodes').val($(this).val());
                let platinumNodes = $('#platinumNodes').val();
                
                let diamondPlusBonus = diamondNodes * 120000;
                let platinumPlusBonus = platinumNodes * 34500;
                let silverPlusBonus = silverNodes * 3150;
                let goldPlusBonus = goldNodes * 11000;
                let copperPlusBonus = copperNodes * 1000;
                let allNodesPlusBonus = diamondPlusBonus + platinumPlusBonus + goldPlusBonus + silverPlusBonus + copperPlusBonus;
                
                let diamondPerBlockReward = (diamondPlusBonus) / allNodesPlusBonus;
                let platinumPerBlockReward = (platinumPlusBonus) / allNodesPlusBonus;
                let goldPerBlockReward = (goldPlusBonus) / allNodesPlusBonus;
                let silverPerBlockReward = (silverPlusBonus) / allNodesPlusBonus;
                let copperPerBlockReward = (copperPlusBonus) / allNodesPlusBonus;
                
                let diamondRewardInDivi = (diamondPerBlockReward / diamondNodes) * diviRewardSplit;
                let platinumRewardInDivi = (platinumPerBlockReward / platinumNodes) * diviRewardSplit;
                let goldRewardInDivi = (goldPerBlockReward / goldNodes) * diviRewardSplit;
                let silverRewardInDivi = (silverPerBlockReward / silverNodes) * diviRewardSplit;
                let copperRewardInDivi = (copperPerBlockReward / copperNodes) * diviRewardSplit;
                
                $('#diamondRewardInDivi').html(diamondRewardInDivi.toLocaleString('en'));
                $('#platinumRewardInDivi').html(platinumRewardInDivi.toLocaleString('en'));
                $('#goldRewardInDivi').html(goldRewardInDivi.toLocaleString('en'));
                $('#silverRewardInDivi').html(silverRewardInDivi.toLocaleString('en'));
                $('#copperRewardInDivi').html(copperRewardInDivi.toLocaleString('en'));
    
                let diamondRewardInDollars = currentValue * diamondRewardInDivi;
                let platinumRewardInDollars = currentValue * platinumRewardInDivi;
                let goldRewardInDollars = currentValue * goldRewardInDivi;
                let silverRewardInDollars = currentValue * silverRewardInDivi;
                let copperRewardInDollars = currentValue * copperRewardInDivi;
                
                $('#diamondRewardInDollars').html(`$${diamondRewardInDollars.toLocaleString('en')}`);
                $('#platinumRewardInDollars').html(`$${platinumRewardInDollars.toLocaleString('en')}`);
                $('#goldRewardInDollars').html(`$${goldRewardInDollars.toLocaleString('en')}`);
                $('#silverRewardInDollars').html(`$${silverRewardInDollars.toLocaleString('en')}`);
                $('#copperRewardInDollars').html(`$${copperRewardInDollars.toLocaleString('en')}`); 
            });
            
    
            $('#goldNodes').change(function() {
                $('#goldNodes').val($(this).val());
                let goldNodes = $('#goldNodes').val();
                let diamondPlusBonus = diamondNodes * 120000;
                let platinumPlusBonus = platinumNodes * 34500;
                let silverPlusBonus = silverNodes * 3150;
                let goldPlusBonus = goldNodes * 11000;
                let copperPlusBonus = copperNodes * 1000;
                let allNodesPlusBonus = diamondPlusBonus + platinumPlusBonus + goldPlusBonus + silverPlusBonus + copperPlusBonus;
                
                let diamondPerBlockReward = (diamondPlusBonus) / allNodesPlusBonus;
                let platinumPerBlockReward = (platinumPlusBonus) / allNodesPlusBonus;
                let goldPerBlockReward = (goldPlusBonus) / allNodesPlusBonus;
                let silverPerBlockReward = (silverPlusBonus) / allNodesPlusBonus;
                let copperPerBlockReward = (copperPlusBonus) / allNodesPlusBonus;
                
                let diamondRewardInDivi = (diamondPerBlockReward / diamondNodes) * diviRewardSplit;
                let platinumRewardInDivi = (platinumPerBlockReward / platinumNodes) * diviRewardSplit;
                let goldRewardInDivi = (goldPerBlockReward / goldNodes) * diviRewardSplit;
                let silverRewardInDivi = (silverPerBlockReward / silverNodes) * diviRewardSplit;
                let copperRewardInDivi = (copperPerBlockReward / copperNodes) * diviRewardSplit;
                
                $('#diamondRewardInDivi').html(diamondRewardInDivi.toLocaleString('en'));
                $('#platinumRewardInDivi').html(platinumRewardInDivi.toLocaleString('en'));
                $('#goldRewardInDivi').html(goldRewardInDivi.toLocaleString('en'));
                $('#silverRewardInDivi').html(silverRewardInDivi.toLocaleString('en'));
                $('#copperRewardInDivi').html(copperRewardInDivi.toLocaleString('en'));
    
                let diamondRewardInDollars = currentValue * diamondRewardInDivi;
                let platinumRewardInDollars = currentValue * platinumRewardInDivi;
                let goldRewardInDollars = currentValue * goldRewardInDivi;
                let silverRewardInDollars = currentValue * silverRewardInDivi;
                let copperRewardInDollars = currentValue * copperRewardInDivi;
                
                $('#diamondRewardInDollars').html(`$${diamondRewardInDollars.toLocaleString('en')}`);
                $('#platinumRewardInDollars').html(`$${platinumRewardInDollars.toLocaleString('en')}`);
                $('#goldRewardInDollars').html(`$${goldRewardInDollars.toLocaleString('en')}`);
                $('#silverRewardInDollars').html(`$${silverRewardInDollars.toLocaleString('en')}`);
                $('#copperRewardInDollars').html(`$${copperRewardInDollars.toLocaleString('en')}`);
            });
            
            
            $('#silverNodes').change(function() {
                $('#silverNodes').val($(this).val());
                let silverNodes = $('#silverNodes').val();
                let diamondPlusBonus = diamondNodes * 120000;
                let platinumPlusBonus = platinumNodes * 34500;
                let silverPlusBonus = silverNodes * 3150;
                let goldPlusBonus = goldNodes * 11000;
                let copperPlusBonus = copperNodes * 1000;
                let allNodesPlusBonus = diamondPlusBonus + platinumPlusBonus + goldPlusBonus + silverPlusBonus + copperPlusBonus;
                
                let diamondPerBlockReward = (diamondPlusBonus) / allNodesPlusBonus;
                let platinumPerBlockReward = (platinumPlusBonus) / allNodesPlusBonus;
                let goldPerBlockReward = (goldPlusBonus) / allNodesPlusBonus;
                let silverPerBlockReward = (silverPlusBonus) / allNodesPlusBonus;
                let copperPerBlockReward = (copperPlusBonus) / allNodesPlusBonus;
                
                let diamondRewardInDivi = (diamondPerBlockReward / diamondNodes) * diviRewardSplit;
                let platinumRewardInDivi = (platinumPerBlockReward / platinumNodes) * diviRewardSplit;
                let goldRewardInDivi = (goldPerBlockReward / goldNodes) * diviRewardSplit;
                let silverRewardInDivi = (silverPerBlockReward / silverNodes) * diviRewardSplit;
                let copperRewardInDivi = (copperPerBlockReward / copperNodes) * diviRewardSplit;
                
                $('#diamondRewardInDivi').html(diamondRewardInDivi.toLocaleString('en'));
                $('#platinumRewardInDivi').html(platinumRewardInDivi.toLocaleString('en'));
                $('#goldRewardInDivi').html(goldRewardInDivi.toLocaleString('en'));
                $('#silverRewardInDivi').html(silverRewardInDivi.toLocaleString('en'));
                $('#copperRewardInDivi').html(copperRewardInDivi.toLocaleString('en'));
    
                let diamondRewardInDollars = currentValue * diamondRewardInDivi;
                let platinumRewardInDollars = currentValue * platinumRewardInDivi;
                let goldRewardInDollars = currentValue * goldRewardInDivi;
                let silverRewardInDollars = currentValue * silverRewardInDivi;
                let copperRewardInDollars = currentValue * copperRewardInDivi;
                
                $('#diamondRewardInDollars').html(`$${diamondRewardInDollars.toLocaleString('en')}`);
                $('#platinumRewardInDollars').html(`$${platinumRewardInDollars.toLocaleString('en')}`);
                $('#goldRewardInDollars').html(`$${goldRewardInDollars.toLocaleString('en')}`);
                $('#silverRewardInDollars').html(`$${silverRewardInDollars.toLocaleString('en')}`);
                $('#copperRewardInDollars').html(`$${copperRewardInDollars.toLocaleString('en')}`); 
            });
    
    
            $('#copperNodes').change(function() {
                $('#copperNodes').val($(this).val());
                let copperNodes = $('#copperNodes').val();
                let diamondPlusBonus = diamondNodes * 120000;
                let platinumPlusBonus = platinumNodes * 34500;
                let silverPlusBonus = silverNodes * 3150;
                let goldPlusBonus = goldNodes * 11000;
                let copperPlusBonus = copperNodes * 1000;
                let allNodesPlusBonus = diamondPlusBonus + platinumPlusBonus + goldPlusBonus + silverPlusBonus + copperPlusBonus;
                
                let diamondPerBlockReward = (diamondPlusBonus) / allNodesPlusBonus;
                let platinumPerBlockReward = (platinumPlusBonus) / allNodesPlusBonus;
                let goldPerBlockReward = (goldPlusBonus) / allNodesPlusBonus;
                let silverPerBlockReward = (silverPlusBonus) / allNodesPlusBonus;
                let copperPerBlockReward = (copperPlusBonus) / allNodesPlusBonus;
                
                let diamondRewardInDivi = (diamondPerBlockReward / diamondNodes) * diviRewardSplit;
                let platinumRewardInDivi = (platinumPerBlockReward / platinumNodes) * diviRewardSplit;
                let goldRewardInDivi = (goldPerBlockReward / goldNodes) * diviRewardSplit;
                let silverRewardInDivi = (silverPerBlockReward / silverNodes) * diviRewardSplit;
                let copperRewardInDivi = (copperPerBlockReward / copperNodes) * diviRewardSplit;
                
                $('#diamondRewardInDivi').html(diamondRewardInDivi.toLocaleString('en'));
                $('#platinumRewardInDivi').html(platinumRewardInDivi.toLocaleString('en'));
                $('#goldRewardInDivi').html(goldRewardInDivi.toLocaleString('en'));
                $('#silverRewardInDivi').html(silverRewardInDivi.toLocaleString('en'));
                $('#copperRewardInDivi').html(copperRewardInDivi.toLocaleString('en'));
    
                let diamondRewardInDollars = currentValue * diamondRewardInDivi;
                let platinumRewardInDollars = currentValue * platinumRewardInDivi;
                let goldRewardInDollars = currentValue * goldRewardInDivi;
                let silverRewardInDollars = currentValue * silverRewardInDivi;
                let copperRewardInDollars = currentValue * copperRewardInDivi;
                
                $('#diamondRewardInDollars').html(`$${diamondRewardInDollars.toLocaleString('en')}`);
                $('#platinumRewardInDollars').html(`$${platinumRewardInDollars.toLocaleString('en')}`);
                $('#goldRewardInDollars').html(`$${goldRewardInDollars.toLocaleString('en')}`);
                $('#silverRewardInDollars').html(`$${silverRewardInDollars.toLocaleString('en')}`);
                $('#copperRewardInDollars').html(`$${copperRewardInDollars.toLocaleString('en')}`);
            });
        }
        
        changeRewards();

        // slider
        $(function() {
            $("#slider-range-min").slider({
                range: "min",
                value: currentValue,
                min: 1,
                max: 700,
                slide: function(event, ui) {
                    $("#amount").val(`$${ui.value}`);
                    
                    let diamondRewardInDollars = ui.value * diamondRewardInDivi;
                    let platinumRewardInDollars = ui.value * platinumRewardInDivi;
                    let goldRewardInDollars = ui.value * goldRewardInDivi;
                    let silverRewardInDollars = ui.value * silverRewardInDivi;
                    let copperRewardInDollars = ui.value * copperRewardInDivi;

                    $('#diamondRewardInDollars').html(`$${diamondRewardInDollars.toLocaleString('en')}`);
                    $('#platinumRewardInDollars').html(`$${platinumRewardInDollars.toLocaleString('en')}`);
                    $('#goldRewardInDollars').html(`$${goldRewardInDollars.toLocaleString('en')}`);
                    $('#silverRewardInDollars').html(`$${silverRewardInDollars.toLocaleString('en')}`);
                    $('#copperRewardInDollars').html(`$${copperRewardInDollars.toLocaleString('en')}`);
                    
                    function changeSliderRewards() {
                        $('#diamondNodes').change(function() {
                            $('#diamondNodes').val($(this).val());
                            let diamondNodes = $('#diamondNodes').val();
                             
                            let diamondPlusBonus = diamondNodes * 120000;
                            let platinumPlusBonus = platinumNodes * 34500;
                            let silverPlusBonus = silverNodes * 3150;
                            let goldPlusBonus = goldNodes * 11000;
                            let copperPlusBonus = copperNodes * 1000;
                            let allNodesPlusBonus = diamondPlusBonus + platinumPlusBonus + goldPlusBonus + silverPlusBonus + copperPlusBonus;
                            
                            let diamondPerBlockReward = (diamondPlusBonus) / allNodesPlusBonus;
                            let platinumPerBlockReward = (platinumPlusBonus) / allNodesPlusBonus;
                            let goldPerBlockReward = (goldPlusBonus) / allNodesPlusBonus;
                            let silverPerBlockReward = (silverPlusBonus) / allNodesPlusBonus;
                            let copperPerBlockReward = (copperPlusBonus) / allNodesPlusBonus;
                            
                            let diamondRewardInDivi = (diamondPerBlockReward / diamondNodes) * diviRewardSplit;
                            let platinumRewardInDivi = (platinumPerBlockReward / platinumNodes) * diviRewardSplit;
                            let goldRewardInDivi = (goldPerBlockReward / goldNodes) * diviRewardSplit;
                            let silverRewardInDivi = (silverPerBlockReward / silverNodes) * diviRewardSplit;
                            let copperRewardInDivi = (copperPerBlockReward / copperNodes) * diviRewardSplit;
                            
                            $('#diamondRewardInDivi').html(diamondRewardInDivi.toLocaleString('en'));
                            $('#platinumRewardInDivi').html(platinumRewardInDivi.toLocaleString('en'));
                            $('#goldRewardInDivi').html(goldRewardInDivi.toLocaleString('en'));
                            $('#silverRewardInDivi').html(silverRewardInDivi.toLocaleString('en'));
                            $('#copperRewardInDivi').html(copperRewardInDivi.toLocaleString('en'));
                
                            let diamondRewardInDollars = ui.value * diamondRewardInDivi;
                            let platinumRewardInDollars = ui.value * platinumRewardInDivi;
                            let goldRewardInDollars = ui.value * goldRewardInDivi;
                            let silverRewardInDollars = ui.value * silverRewardInDivi;
                            let copperRewardInDollars = ui.value * copperRewardInDivi;
                            
                            $('#diamondRewardInDollars').html(`$${diamondRewardInDollars.toLocaleString('en')}`);
                            $('#platinumRewardInDollars').html(`$${platinumRewardInDollars.toLocaleString('en')}`);
                            $('#goldRewardInDollars').html(`$${goldRewardInDollars.toLocaleString('en')}`);
                            $('#silverRewardInDollars').html(`$${silverRewardInDollars.toLocaleString('en')}`);
                            $('#copperRewardInDollars').html(`$${copperRewardInDollars.toLocaleString('en')}`);    
                        });
                        
                        $('#platinumNodes').change(function() {
                            $('#platinumNodes').val($(this).val());
                            let platinumNodes = $('#platinumNodes').val();
                            
                            let diamondPlusBonus = diamondNodes * 120000;
                            let platinumPlusBonus = platinumNodes * 34500;
                            let silverPlusBonus = silverNodes * 3150;
                            let goldPlusBonus = goldNodes * 11000;
                            let copperPlusBonus = copperNodes * 1000;
                            let allNodesPlusBonus = diamondPlusBonus + platinumPlusBonus + goldPlusBonus + silverPlusBonus + copperPlusBonus;
                            
                            let diamondPerBlockReward = (diamondPlusBonus) / allNodesPlusBonus;
                            let platinumPerBlockReward = (platinumPlusBonus) / allNodesPlusBonus;
                            let goldPerBlockReward = (goldPlusBonus) / allNodesPlusBonus;
                            let silverPerBlockReward = (silverPlusBonus) / allNodesPlusBonus;
                            let copperPerBlockReward = (copperPlusBonus) / allNodesPlusBonus;
                            
                            let diamondRewardInDivi = (diamondPerBlockReward / diamondNodes) * diviRewardSplit;
                            let platinumRewardInDivi = (platinumPerBlockReward / platinumNodes) * diviRewardSplit;
                            let goldRewardInDivi = (goldPerBlockReward / goldNodes) * diviRewardSplit;
                            let silverRewardInDivi = (silverPerBlockReward / silverNodes) * diviRewardSplit;
                            let copperRewardInDivi = (copperPerBlockReward / copperNodes) * diviRewardSplit;
                            
                            $('#diamondRewardInDivi').html(diamondRewardInDivi.toLocaleString('en'));
                            $('#platinumRewardInDivi').html(platinumRewardInDivi.toLocaleString('en'));
                            $('#goldRewardInDivi').html(goldRewardInDivi.toLocaleString('en'));
                            $('#silverRewardInDivi').html(silverRewardInDivi.toLocaleString('en'));
                            $('#copperRewardInDivi').html(copperRewardInDivi.toLocaleString('en'));
                
                            let diamondRewardInDollars = ui.value * diamondRewardInDivi;
                            let platinumRewardInDollars = ui.value * platinumRewardInDivi;
                            let goldRewardInDollars = ui.value * goldRewardInDivi;
                            let silverRewardInDollars = ui.value * silverRewardInDivi;
                            let copperRewardInDollars = ui.value * copperRewardInDivi;
                            
                            $('#diamondRewardInDollars').html(`$${diamondRewardInDollars.toLocaleString('en')}`);
                            $('#platinumRewardInDollars').html(`$${platinumRewardInDollars.toLocaleString('en')}`);
                            $('#goldRewardInDollars').html(`$${goldRewardInDollars.toLocaleString('en')}`);
                            $('#silverRewardInDollars').html(`$${silverRewardInDollars.toLocaleString('en')}`);
                            $('#copperRewardInDollars').html(`$${copperRewardInDollars.toLocaleString('en')}`); 
                        });
                        
                
                        $('#goldNodes').change(function() {
                            $('#goldNodes').val($(this).val());
                            let goldNodes = $('#goldNodes').val();
                            let diamondPlusBonus = diamondNodes * 120000;
                            let platinumPlusBonus = platinumNodes * 34500;
                            let silverPlusBonus = silverNodes * 3150;
                            let goldPlusBonus = goldNodes * 11000;
                            let copperPlusBonus = copperNodes * 1000;
                            let allNodesPlusBonus = diamondPlusBonus + platinumPlusBonus + goldPlusBonus + silverPlusBonus + copperPlusBonus;
                            
                            let diamondPerBlockReward = (diamondPlusBonus) / allNodesPlusBonus;
                            let platinumPerBlockReward = (platinumPlusBonus) / allNodesPlusBonus;
                            let goldPerBlockReward = (goldPlusBonus) / allNodesPlusBonus;
                            let silverPerBlockReward = (silverPlusBonus) / allNodesPlusBonus;
                            let copperPerBlockReward = (copperPlusBonus) / allNodesPlusBonus;
                            
                            let diamondRewardInDivi = (diamondPerBlockReward / diamondNodes) * diviRewardSplit;
                            let platinumRewardInDivi = (platinumPerBlockReward / platinumNodes) * diviRewardSplit;
                            let goldRewardInDivi = (goldPerBlockReward / goldNodes) * diviRewardSplit;
                            let silverRewardInDivi = (silverPerBlockReward / silverNodes) * diviRewardSplit;
                            let copperRewardInDivi = (copperPerBlockReward / copperNodes) * diviRewardSplit;
                            
                            $('#diamondRewardInDivi').html(diamondRewardInDivi.toLocaleString('en'));
                            $('#platinumRewardInDivi').html(platinumRewardInDivi.toLocaleString('en'));
                            $('#goldRewardInDivi').html(goldRewardInDivi.toLocaleString('en'));
                            $('#silverRewardInDivi').html(silverRewardInDivi.toLocaleString('en'));
                            $('#copperRewardInDivi').html(copperRewardInDivi.toLocaleString('en'));
                
                            let diamondRewardInDollars = ui.value * diamondRewardInDivi;
                            let platinumRewardInDollars = ui.value * platinumRewardInDivi;
                            let goldRewardInDollars = ui.value * goldRewardInDivi;
                            let silverRewardInDollars = ui.value * silverRewardInDivi;
                            let copperRewardInDollars = ui.value * copperRewardInDivi;
                            
                            $('#diamondRewardInDollars').html(`$${diamondRewardInDollars.toLocaleString('en')}`);
                            $('#platinumRewardInDollars').html(`$${platinumRewardInDollars.toLocaleString('en')}`);
                            $('#goldRewardInDollars').html(`$${goldRewardInDollars.toLocaleString('en')}`);
                            $('#silverRewardInDollars').html(`$${silverRewardInDollars.toLocaleString('en')}`);
                            $('#copperRewardInDollars').html(`$${copperRewardInDollars.toLocaleString('en')}`);
                        });
                        
                        
                        $('#silverNodes').change(function() {
                            $('#silverNodes').val($(this).val());
                            let silverNodes = $('#silverNodes').val();
                            let diamondPlusBonus = diamondNodes * 120000;
                            let platinumPlusBonus = platinumNodes * 34500;
                            let silverPlusBonus = silverNodes * 3150;
                            let goldPlusBonus = goldNodes * 11000;
                            let copperPlusBonus = copperNodes * 1000;
                            let allNodesPlusBonus = diamondPlusBonus + platinumPlusBonus + goldPlusBonus + silverPlusBonus + copperPlusBonus;
                            
                            let diamondPerBlockReward = (diamondPlusBonus) / allNodesPlusBonus;
                            let platinumPerBlockReward = (platinumPlusBonus) / allNodesPlusBonus;
                            let goldPerBlockReward = (goldPlusBonus) / allNodesPlusBonus;
                            let silverPerBlockReward = (silverPlusBonus) / allNodesPlusBonus;
                            let copperPerBlockReward = (copperPlusBonus) / allNodesPlusBonus;
                            
                            let diamondRewardInDivi = (diamondPerBlockReward / diamondNodes) * diviRewardSplit;
                            let platinumRewardInDivi = (platinumPerBlockReward / platinumNodes) * diviRewardSplit;
                            let goldRewardInDivi = (goldPerBlockReward / goldNodes) * diviRewardSplit;
                            let silverRewardInDivi = (silverPerBlockReward / silverNodes) * diviRewardSplit;
                            let copperRewardInDivi = (copperPerBlockReward / copperNodes) * diviRewardSplit;
                            
                            $('#diamondRewardInDivi').html(diamondRewardInDivi.toLocaleString('en'));
                            $('#platinumRewardInDivi').html(platinumRewardInDivi.toLocaleString('en'));
                            $('#goldRewardInDivi').html(goldRewardInDivi.toLocaleString('en'));
                            $('#silverRewardInDivi').html(silverRewardInDivi.toLocaleString('en'));
                            $('#copperRewardInDivi').html(copperRewardInDivi.toLocaleString('en'));
                
                            let diamondRewardInDollars = ui.value * diamondRewardInDivi;
                            let platinumRewardInDollars = ui.value * platinumRewardInDivi;
                            let goldRewardInDollars = ui.value * goldRewardInDivi;
                            let silverRewardInDollars = ui.value * silverRewardInDivi;
                            let copperRewardInDollars = ui.value * copperRewardInDivi;
                            
                            $('#diamondRewardInDollars').html(`$${diamondRewardInDollars.toLocaleString('en')}`);
                            $('#platinumRewardInDollars').html(`$${platinumRewardInDollars.toLocaleString('en')}`);
                            $('#goldRewardInDollars').html(`$${goldRewardInDollars.toLocaleString('en')}`);
                            $('#silverRewardInDollars').html(`$${silverRewardInDollars.toLocaleString('en')}`);
                            $('#copperRewardInDollars').html(`$${copperRewardInDollars.toLocaleString('en')}`); 
                        });
                
                
                        $('#copperNodes').change(function() {
                            $('#copperNodes').val($(this).val());
                            let copperNodes = $('#copperNodes').val();
                            let diamondPlusBonus = diamondNodes * 120000;
                            let platinumPlusBonus = platinumNodes * 34500;
                            let silverPlusBonus = silverNodes * 3150;
                            let goldPlusBonus = goldNodes * 11000;
                            let copperPlusBonus = copperNodes * 1000;
                            let allNodesPlusBonus = diamondPlusBonus + platinumPlusBonus + goldPlusBonus + silverPlusBonus + copperPlusBonus;
                            
                            let diamondPerBlockReward = (diamondPlusBonus) / allNodesPlusBonus;
                            let platinumPerBlockReward = (platinumPlusBonus) / allNodesPlusBonus;
                            let goldPerBlockReward = (goldPlusBonus) / allNodesPlusBonus;
                            let silverPerBlockReward = (silverPlusBonus) / allNodesPlusBonus;
                            let copperPerBlockReward = (copperPlusBonus) / allNodesPlusBonus;
                            
                            let diamondRewardInDivi = (diamondPerBlockReward / diamondNodes) * diviRewardSplit;
                            let platinumRewardInDivi = (platinumPerBlockReward / platinumNodes) * diviRewardSplit;
                            let goldRewardInDivi = (goldPerBlockReward / goldNodes) * diviRewardSplit;
                            let silverRewardInDivi = (silverPerBlockReward / silverNodes) * diviRewardSplit;
                            let copperRewardInDivi = (copperPerBlockReward / copperNodes) * diviRewardSplit;
                            
                            $('#diamondRewardInDivi').html(diamondRewardInDivi.toLocaleString('en'));
                            $('#platinumRewardInDivi').html(platinumRewardInDivi.toLocaleString('en'));
                            $('#goldRewardInDivi').html(goldRewardInDivi.toLocaleString('en'));
                            $('#silverRewardInDivi').html(silverRewardInDivi.toLocaleString('en'));
                            $('#copperRewardInDivi').html(copperRewardInDivi.toLocaleString('en'));
                
                            let diamondRewardInDollars = ui.value * diamondRewardInDivi;
                            let platinumRewardInDollars = ui.value * platinumRewardInDivi;
                            let goldRewardInDollars = ui.value * goldRewardInDivi;
                            let silverRewardInDollars = ui.value * silverRewardInDivi;
                            let copperRewardInDollars = ui.value * copperRewardInDivi;
                            
                            $('#diamondRewardInDollars').html(`$${diamondRewardInDollars.toLocaleString('en')}`);
                            $('#platinumRewardInDollars').html(`$${platinumRewardInDollars.toLocaleString('en')}`);
                            $('#goldRewardInDollars').html(`$${goldRewardInDollars.toLocaleString('en')}`);
                            $('#silverRewardInDollars').html(`$${silverRewardInDollars.toLocaleString('en')}`);
                            $('#copperRewardInDollars').html(`$${copperRewardInDollars.toLocaleString('en')}`);
                        });
                    }

                    changeSliderRewards();
                    
                }
            });
            $("#amount").val("$" + $("#slider-range-min").slider("value"));
        });
    });

    
})






