import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  CheckCircle2,
  XCircle,
  IndianRupee,
  TrendingUp,
  PlusCircle,
  ArrowRight,
  Info,
  Layers,
  PieChart as PieChartIcon,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import artStudioApi from '../api/artStudioApi';
import StatCard from '../components/StatCard';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';

export const DashboardPage = () => {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await artStudioApi.getAllStudios();
      setStudios(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch studio records from the backend');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudios();
  }, [fetchStudios]);

  // Derived Genuine Metrics
  const totalStudios = studios.length;
  const activeStudios = studios.filter((s) => s.active).length;
  const inactiveStudios = totalStudios - activeStudios;

  const totalMonthlyRent = studios.reduce(
    (sum, s) => sum + (Number(s.monthlyRent) || 0),
    0
  );

  const averageMonthlyRent =
    totalStudios > 0 ? totalMonthlyRent / totalStudios : 0;

  // Currency Formatter
  const formatINR = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(val || 0);

  // Chart Data: Occupancy Ratio
  const occupancyPieData = [
    { name: 'Active Studios', value: activeStudios, color: '#2E8555' },
    { name: 'Inactive / Vacant', value: inactiveStudios, color: '#8E94A2' },
  ].filter((d) => d.value > 0);

  // Chart Data: Rent by Studio (top up to 8 studios for clarity)
  const rentBarData = studios.slice(0, 8).map((s) => ({
    name: s.studioName.length > 14 ? `${s.studioName.substring(0, 12)}…` : s.studioName,
    fullName: s.studioName,
    rent: Number(s.monthlyRent) || 0,
    active: s.active,
  }));

  if (loading) {
    return <LoadingState message="Fetching Art Studio portfolio data from Spring Boot..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Could not load studio overview"
        message={error}
        onRetry={fetchStudios}
      />
    );
  }

  if (totalStudios === 0) {
    return (
      <EmptyState
        title="No art studios in your database"
        description="The Spring Boot service returned an empty database. Register your first studio workspace to start tracking tenancy and revenue."
        actionLabel="Register First Studio"
        actionTo="/studios/new"
      />
    );
  }

  return (
    <div>
      {/* Hero Header */}
      <div className="dashboard-hero">
        <h2 className="dashboard-hero-title">Studio Portfolio Overview</h2>
        <p className="dashboard-hero-subtitle">
          Real-time metrics, rent capacity, and occupancy derived from your PostgreSQL database.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="stat-grid">
        <StatCard
          label="Total Studios"
          value={totalStudios}
          icon={Building2}
          metaText="Registered properties"
        />

        <StatCard
          label="Active Studios"
          value={activeStudios}
          icon={CheckCircle2}
          theme="active"
          metaText={`${totalStudios ? Math.round((activeStudios / totalStudios) * 100) : 0}% occupancy rate`}
        />

        <StatCard
          label="Inactive Studios"
          value={inactiveStudios}
          icon={XCircle}
          theme="inactive"
          metaText="Vacant or offline"
        />

        <StatCard
          label="Total Monthly Rent"
          value={formatINR(totalMonthlyRent)}
          icon={IndianRupee}
          metaText="Across all current records"
        />

        <StatCard
          label="Average Rent"
          value={formatINR(averageMonthlyRent)}
          icon={TrendingUp}
          metaText="Per registered studio"
        />
      </div>

      {/* Database Schema Transparency Callout */}
      <div className="info-callout" role="note">
        <Info size={18} className="info-callout-icon" />
        <p className="info-callout-text">
          <strong>Database Schema Note:</strong> The backend <code>ArtStudio</code> entity stores{' '}
          <code>id</code>, <code>studio_name</code>, <code>owner_name</code>, <code>monthly_rent</code>, and{' '}
          <code>active</code>. Creation and modification timestamps are not captured in the backend schema;
          consequently, artificial historical timelines are intentionally omitted to maintain data integrity.
        </p>
      </div>

      {/* Genuine Recharts Visualizations */}
      <div className="charts-grid">
        {/* Occupancy Donut */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Studio Tenancy Status</h3>
              <p className="chart-desc">Active occupied leases vs inactive/vacant studios</p>
            </div>
            <PieChartIcon size={18} style={{ color: 'var(--terracotta-500)' }} />
          </div>

          <div className="chart-content">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={occupancyPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {occupancyPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [
                    `${value} Studio${value > 1 ? 's' : ''} (${Math.round(
                      (value / totalStudios) * 100
                    )}%)`,
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--charcoal-200)',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: 'var(--shadow-sm)',
                    fontSize: '0.82rem',
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => (
                    <span style={{ color: 'var(--charcoal-700)', fontSize: '0.82rem' }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rent by Studio Bar Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Monthly Rent Distribution</h3>
              <p className="chart-desc">Comparison of studio monthly rental rates (INR)</p>
            </div>
            <Layers size={18} style={{ color: 'var(--terracotta-500)' }} />
          </div>

          <div className="chart-content">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={rentBarData} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--charcoal-100)" />
                <XAxis
                  dataKey="name"
                  stroke="var(--charcoal-500)"
                  fontSize={11}
                  tickLine={false}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                />
                <YAxis
                  stroke="var(--charcoal-500)"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `₹${val}`}
                />
                <Tooltip
                  formatter={(value) => [formatINR(value), 'Monthly Rent']}
                  labelFormatter={(name, payload) => {
                    const item = payload?.[0]?.payload;
                    return item ? item.fullName : name;
                  }}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--charcoal-200)',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: 'var(--shadow-sm)',
                    fontSize: '0.82rem',
                  }}
                />
                <Bar
                  dataKey="rent"
                  fill="var(--terracotta-500)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={45}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions Strip */}
      <div className="quick-actions-bar">
        <div className="quick-actions-copy">
          <h4 className="quick-actions-title">Studio Portfolio Operations</h4>
          <p className="quick-actions-sub">
            Review full records, apply sorting, or register a new workspace property.
          </p>
        </div>

        <div className="quick-actions-btns">
          <Link to="/studios" className="btn-artistry-secondary">
            <span>View All Studios</span>
            <ArrowRight size={15} />
          </Link>
          <Link to="/studios/new" className="btn-artistry-primary">
            <PlusCircle size={15} />
            <span>Add Studio</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
