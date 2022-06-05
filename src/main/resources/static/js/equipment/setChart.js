import { showAbilityGraph } from "../graph/showGraph.js";
import { getHelmetData, getChestplateData, getVambraceData, getCuishData, getMainData, getSubData } from "./setEquipments.js"

var equipmentBonus = [getHelmetData, getChestplateData, getVambraceData, getCuishData, getMainData, getSubData];

export function setAbilityChart(attack = 0, health = 0, defense = 0, reaction = 0, agile = 0) {
    let bonusAttack = 0;
    let bonusHealth = 0;
    let bonusDefense = 0;
    let bonusReaction = 0;
    let bonusAgile = 0;

    for (let i = 0; i < equipmentBonus.length; i++) {
        let bonus = equipmentBonus[i]();

        bonusAttack += bonus.ability.attack;
        bonusHealth += bonus.ability.health;
        bonusDefense += bonus.ability.defense;
        bonusReaction += bonus.ability.reaction;
        bonusAgile += bonus.ability.agile;
    }

    let chart = $("#chart");
    let abilityChart = $("<canvas></canvas>");

    showAbilityGraph(abilityChart, attack + bonusAttack, health + bonusHealth, defense + bonusDefense, reaction + bonusReaction, agile + bonusAgile);
    $("#attack").html(attack + "(" + (bonusAttack == 0 ? "±" : (bonusAttack > 0 ? "+" : "")) + bonusAttack + ")");
    $("#health").html(health + "(" + (bonusHealth == 0 ? "±" : (bonusHealth > 0 ? "+" : "")) + bonusHealth + ")");
    $("#defense").html(defense + "(" + (bonusDefense == 0 ? "±" : (bonusDefense > 0 ? "+" : "")) + bonusDefense + ")");
    $("#reaction").html(reaction + "(" + (bonusReaction == 0 ? "±" : (bonusReaction > 0 ? "+" : "")) + bonusReaction + ")");
    $("#agile").html(agile + "(" + (bonusAgile == 0 ? "±" : (bonusAgile > 0 ? "+" : "")) + bonusAgile + ")");
    
    chart.empty();
    abilityChart.appendTo(chart);
}