<template>
    <v-row>
        <v-col cols="12">
            <div class="chart" ref="chartGuesses" :style="'height: 40vh'"/>
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
        this.elaboratedData = this.guesses.map(g => {
            return {
                score: g.preso_score,
                match: g.match.hometeam_name + "-" + g.match.awayteam_name
            }
        }).reverse();
        this.createChart();
    },
    methods:{
        createChart(){
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
            valueAxis.min = 0;
            valueAxis.max = 19;


            valueAxis.renderer.labels.template.adapter.add("text", function(text, target) {
                // if(["2","4","5","7","9","19"].includes(text)){
                //     return text;
                // }
                return "";
            });
            categoryAxis.renderer.labels.template.adapter.add("text", function(text, target) {
                return "";
            });


            // var dropShadow = new am4core.DropShadowFilter();
            // dropShadow.dy = 1;
            // dropShadow.dx = 1;
            // dropShadow.opacity = 0.5;
            // valueAxis.tooltip.filters.push(dropShadow);
            // valueAxis.tooltip.background.strokeWidth = 0;
            // valueAxis.tooltip.background.cornerRadius = 3;
            // valueAxis.tooltip.background.pointerLength = 0;
            // valueAxis.tooltip.background.fill = "blue"
            // valueAxis.adapter.add("getTooltipText", function(text, target) {
            //     // let m = moment(text).locale('it-IT').format('D MMMM Y')
            //     return "[bold white] "+ text + " [/]";
            // });


            let series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = "score";
            series.dataFields.categoryX = "match";
            series.tensionX = 0.92;
            series.strokeWidth = 6;
            series.stroke = "blue";
            
            var circleBullet = series.bullets.push(new am4charts.CircleBullet());
            // circleBullet.circle.strokeWidth = 4;
            // circleBullet.circle.radius = 6;
            // circleBullet.circle.fill = "white";
            // circleBullet.circle.strokw = "blue";
            // circleBullet.adapter.add("fill", function(fill, target){
            //     if(target.dataItem.dates.dateX){
            //         let add = target.dataItem.dates.dateX.getMonth() % 2;
            //         return COLOR_GRADIENT[index + add];
            //     }
            // });  
            series.minBulletDistance = 20;
            series.fill = "blue";
            // series.fillOpacity = 0.2;
        },
    }
}
</script>