import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import {
  TrendingUp,
  People,
  Inventory,
  AttachMoney,
  MoreVert,
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Sales', value: '$12,456', icon: <AttachMoney />, increase: true, percent: '12%' },
    { title: 'Total Orders', value: '156', icon: <TrendingUp />, increase: true, percent: '8%' },
    { title: 'Total Customers', value: '2,345', icon: <People />, increase: true, percent: '15%' },
    { title: 'Low Stock Items', value: '23', icon: <Inventory />, increase: false, percent: '5%' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          </Grid>
        ))}

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Sales Overview
            </Typography>
            <SalesChart />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Top Products
            </Typography>
            <ProductsTable />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

const StatCard = ({ title, value, icon, increase, percent }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4">
            {value}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            {increase ? <ArrowUpward color="success" /> : <ArrowDownward color="error" />}
            <Typography
              color={increase ? 'success.main' : 'error.main'}
              sx={{ ml: 1 }}
            >
              {percent}
            </Typography>
          </Box>
        </Box>
        <IconButton>{icon}</IconButton>
      </Box>
    </CardContent>
  </Card>
);

const SalesChart = () => {
  const data = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 4500 },
    { name: 'May', sales: 6000 },
    { name: 'Jun', sales: 5500 }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

const ProductsTable = () => {
  const products = [
    { name: 'Baby Onesie', sales: 245, stock: 45 },
    { name: 'Wooden Blocks', sales: 187, stock: 32 },
    { name: 'Baby Monitor', sales: 156, stock: 12 },
    { name: 'Diaper Pack', sales: 132, stock: 78 }
  ];

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Product</TableCell>
          <TableCell align="right">Sales</TableCell>
          <TableCell align="right">Stock</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.name}>
            <TableCell>{product.name}</TableCell>
            <TableCell align="right">{product.sales}</TableCell>
            <TableCell align="right">{product.stock}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminDashboard;