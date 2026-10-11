const StatsCard = ({ icon: Icon, label, value, trend, color = 'primary' }) => {
  const colorMap = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
  };

  return (
    <div className="bg-surface rounded-2xl border border-border p-5 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted font-medium">{label}</p>
          <p className="text-2xl font-bold text-dark mt-1">{value}</p>
          {trend !== undefined && (
            <p className={`text-xs font-medium mt-1 ${trend > 0 ? 'text-success' : 'text-error'}`}>
              {trend > 0 ? '+' : ''}{trend} this week
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colorMap[color]}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
