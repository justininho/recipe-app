type RecipeTagCardProps = {
  tag: string;
  count: number;
  onPress: () => void;
};

export function RecipeTagCard({ tag, count, onPress }: RecipeTagCardProps) {
  return (
    <div
      onClick={onPress}
      style={{
        padding: '12px 16px',
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        marginBottom: 12,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <span style={{ fontSize: 16, fontWeight: 500 }}>{tag}</span>
      <span style={{ fontSize: 14, color: '#666' }}>{count}</span>
    </div>
  );
}