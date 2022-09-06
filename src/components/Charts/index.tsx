import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import './index.scss';
interface IProps {}
const Charts: React.FC = () => {
  const chartsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const charts=echarts.init(chartsRef.current as HTMLDivElement);
    charts.setOption({
        title: {
          subtext: '第一季度',
          subtextStyle: {
            color: 'orange',
            align: 'center'
          },
          show: true,
          link: 'http://www.baidu.com',
          target: 'blank',
          text: '水果销量图',
          textAlign:'center',
          left:'center',
          textStyle: { color: 'red', fontStyle: 'italic', fontWeight: 800, fontSize: 24, align: 'right', height: 300,width:300 }
        },
        xAxis: { data: ['苹果', '香蕉', '菠萝'] },
        yAxis: {
          name: '销量'
        },
        series: {
          name: '每月销量',
          type: 'bar',
          data: [1000, 2300, 4000]
        },
        tooltip: {
          show: true
        }
      })
    return () => {};
  }, []);

  return <div className="charts" ref={chartsRef}></div>;
};

export default Charts;
