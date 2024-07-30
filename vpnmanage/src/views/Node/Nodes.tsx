import React from 'react';
import styles from './nodelist.module.scss';

interface Node {
  id: string;
  name: string;
  description: string;
  multiplier: string;
  speed: string;
  flag: string;
}

const View: React.FC = () => {
  const nodes: Node[] = [
    { id: '1', name: 'US-01', description: 'No description', multiplier: 'x1', speed: 'N/A', flag: '🇺🇸' },
    { id: '2', name: 'Ireland-02', description: 'No description', multiplier: 'x1', speed: 'N/A', flag: '🇮🇪' },
    { id: '3', name: 'Canada-03', description: 'No description', multiplier: 'x1', speed: 'N/A', flag: '🇨🇦' },
    { id: '4', name: 'Hong Kong-04', description: 'No description', multiplier: 'x1', speed: 'N/A', flag: '🇭🇰' },
    { id: '5', name: 'Korea-05', description: 'No description', multiplier: 'x1', speed: 'N/A', flag: '🇰🇷' },
    { id: '6', name: 'Philippine-06', description: 'No description', multiplier: 'x1', speed: 'N/A', flag: '🇵🇭' },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Node List</h2>
      <div className={styles.category}>
        <span className={styles.categoryIcon}></span>
        IPLC High Speed Node
      </div>
      <div className={styles.nodeGrid}>
        {nodes.map((node) => (
          <div key={node.id} className={styles.nodeCard}>
            <div className={styles.nodeFlag}>{node.flag}</div>
            <div className={styles.nodeInfo}>
              <div className={styles.nodeName}>
                <span className={styles.nodeStatus}></span>
                {node.name}
              </div>
              <div className={styles.nodeDescription}>{node.description}</div>
            </div>
            <div className={styles.nodeStats}>
              <div className={styles.nodeStat}>
                <span className={styles.nodeStatLabel}>Multiplier</span>
                <span className={styles.nodeStatValue}>{node.multiplier}</span>
              </div>
              <div className={styles.nodeStat}>
                <span className={styles.nodeStatLabel}>Speed Limit</span>
                <span className={styles.nodeStatValue}>{node.speed}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default View;