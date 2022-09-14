<template>
    <v-row>
        <v-col cols="12">
            <div class="chart" ref="chartGuesses" :style="'height: 10vh'"/>
        </v-col>
    </v-row>
</template>
<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default {
    name: "ChartGuesses",
    props:{
        guesses:{type: Array},
    },
    data(){
        return {
            elaboratedData: null,
        }
    },
    mounted(){
        this.elaboratedData = this.guesses.map((g,i) => {
            return {
                points: g.points,
                match: g.match.hometeam_name + "-" + g.match.awayteam_name,
                opacity: i === 0 ? 1 : 0
            }
        }).reverse();
        this.createChart();
    },
    methods:{
        createChart(){
            let chartColor = "blue";
            let chart = am4core.create(this.$refs.chartGuesses, am4charts.XYChart);
            chart.data = this.elaboratedData;

            // chart.cursor = new am4charts.XYCursor();   
            // chart.cursor.lineY.disabled = true;

            let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "match";

            categoryAxis.cursorTooltipEnabled = false;

            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            categoryAxis.renderer.grid.template.strokeOpacity = 0;
            valueAxis.renderer.grid.template.strokeOpacity = 0;
            valueAxis.renderer.baseGrid.disabled = true;
            valueAxis.min = 0;
            valueAxis.max = 19;
            
            // valueAxis.startLocation = 0.5;
            // valueAxis.endLocation = 0.7;
            valueAxis.renderer.labels.template.disabled = true;
            categoryAxis.renderer.labels.template.disabled = true;

            


            let series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = "points";
            series.dataFields.categoryX = "match";
            series.tensionX = 0.9;
            
            series.strokeWidth = 4;
            series.stroke = chartColor;
            var bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.circle.opacity = 0;
            bullet.circle.fill = chartColor;
            bullet.circle.propertyFields.opacity = "opacity";
            bullet.circle.radius = 3;
            series.minBulletDistance = 20;
            series.fill = chartColor;
        },
    }
}
</script>