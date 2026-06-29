import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function PlatformChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/analytics`)
      .then((res) => res.json())
      .then((stats) => {
        setData([
          { name: "Users", value: stats.users },
          { name: "Lawyers", value: stats.lawyers },
          { name: "Services", value: stats.services },
          { name: "Comments", value: stats.comments },
          { name: "Hires", value: stats.hires },
          { name: "Revenue", value: stats.revenue },
        ]);
      });
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#6366F1" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}