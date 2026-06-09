import React, { useEffect, useState } from 'react';
import { getFamilyTree } from '../api/familyApi';
import { getMemberProfile } from '../api/profileApi';

const MemberCard = ({ user, relation, onClick }) => {
  const getColors = (rel) => {
    switch (rel) {
      case 'self':
        return {
          bg: '#2563eb',
          text: '#ffffff',
          border: '#1d4ed8'
        };

      case 'wife':
        return {
          bg: '#fdf2f8',
          text: '#db2777',
          border: '#fbcfe8'
        };

      case 'son':
        return {
          bg: '#ecfdf5',
          text: '#059669',
          border: '#a7f3d0'
        };

      case 'daughter':
        return {
          bg: '#ff6973',
          text: '#7c0be6',
          border: '#f50521'
        };

      default:
        return {
          bg: '#ffffff',
          text: '#334155',
          border: '#e2e8f0'
        };
    }
  };

  const colors = getColors(relation);

  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        backgroundColor: colors.bg,
        color: colors.text,
        borderColor: colors.border,
        borderWidth: '1px',
        borderStyle: 'solid',
        padding: '10px 20px',
        borderRadius: '12px',
        minWidth: '120px',
        textAlign: 'center',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
        fontWeight: '600',
        fontSize: '14px',
      }}
    >
      <div style={{ textTransform: 'capitalize' }}>
        {user}
      </div>

      {relation && (
        <div
          style={{
            fontSize: '11px',
            opacity: 0.7,
            marginTop: '2px'
          }}
        >
          {relation}
        </div>
      )}
    </div>
  );
};

const TreeBranch = ({ node, onSelect }) => {
  if (!node) return null;

  const members = node.familyMember || [];

  const spouses = members.filter(
    m => m.relation === 'wife' || m.relation === 'husband'
  );

  const children = members.filter(
    m => m.relation !== 'wife' && m.relation !== 'husband'
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        <MemberCard
          user={node.user}
          relation={node.relation ?? 'self'}
          onClick={() => onSelect(node.id)}
        />

        {spouses.map((spouse, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '24px', height: '2px', backgroundColor: '#94a3b8' }} />
            <MemberCard
              user={spouse.user}
              relation={spouse.relation}
              onClick={() => onSelect(spouse.id)}
            />
          </div>
        ))}

        {children.length > 0 && (
          <div style={{
            position: 'absolute',
            bottom: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '2px',
            height: '20px',
            backgroundColor: '#94a3b8',
          }} />
        )}
      </div>

      {children.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px', position: 'relative' }}>
          {children.map((child, index) => {
            const isFirst = index === 0;
            const isLast = index === children.length - 1;

            return (
              <div
                key={index}
                style={{
                  position: 'relative',
                  padding: '20px 20px 0 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '2px',
                  height: '20px',
                  backgroundColor: '#94a3b8',
                }} />

                {children.length > 1 && (
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: isFirst ? '50%' : '0',
                    right: isLast ? '50%' : '0',
                    height: '2px',
                    backgroundColor: '#94a3b8',
                  }} />
                )}

                <TreeBranch node={child} onSelect={onSelect} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const MemberSidebar = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(2px)',
          zIndex: 999
        }}
      />

      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '400px',
          height: '100%',
          background: '#ffffff',
          zIndex: 1000,
          padding: '32px 28px',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
          overflowY: 'auto',
          fontFamily: 'sans-serif'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            border: 'none',
            background: '#f1f5f9',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            fontSize: '16px',
            cursor: 'pointer',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ✕
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', marginTop: '8px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '22px',
            fontWeight: '700',
            flexShrink: 0
          }}>
            {member.fullName?.charAt(0)}
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>
              {member.fullName}
            </h2>
            <span style={{
              display: 'inline-block',
              marginTop: '4px',
              padding: '2px 10px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              background: '#eff6ff',
              color: '#2563eb'
            }}>
              {member.relation}
            </span>
          </div>
        </div>

        <div style={{ height: '1px', background: '#e2e8f0', marginBottom: '20px' }} />
        <div style={{
          background: '#f8fafc',
          borderRadius: '10px',
          padding: '14px 16px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#475569',
          fontSize: '14px'
        }}>
          <span style={{ fontSize: '18px' }}>💼</span>
          <span><strong>Occupation:</strong> {member.occupation}</span>
          <span><strong>Annual Income:</strong>{member.annualIncome}</span>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '13px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#94a3b8',
            marginBottom: '12px'
          }}>
            Assets
          </h3>
          {member.assets?.length > 0 ? (
            member.assets.map((a) => (
              <div key={a.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 14px',
                marginBottom: '8px',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '10px',
                fontSize: '14px'
              }}>
                <span style={{ color: '#166534', fontWeight: '500' }}>{a.assetName}</span>
                <span style={{ color: '#15803d', fontWeight: '700' }}>₹{a.currentValue?.toLocaleString()}</span>
              </div>
            ))
          ) : (
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>No assets</p>
          )}
        </div>

        <div>
          <h3 style={{
            fontSize: '13px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#94a3b8',
            marginBottom: '12px'
          }}>
            Liabilities
          </h3>
          {member.liabilities?.length > 0 ? (
            member.liabilities.map((l) => (
              <div key={l.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 14px',
                marginBottom: '8px',
                background: '#fff1f2',
                border: '1px solid #fecdd3',
                borderRadius: '10px',
                fontSize: '14px'
              }}>
                <span style={{ color: '#9f1239', fontWeight: '500' }}>{l.liabilityName}</span>
                <span style={{ color: '#be123c', fontWeight: '700' }}>₹{l.remainingAmount?.toLocaleString()}</span>
              </div>
            ))
          ) : (
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>No liabilities</p>
          )}
        </div>
      </div>
    </>
  );
};

function FamilyTreeGraph() {
  const [familyData, setFamilyData] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFamilyTree();
  }, []);

  const fetchFamilyTree = async () => {
    try {
      const data = await getFamilyTree();
      setFamilyData(data);
    } catch (err) {
      console.log(err);
      setError("Failed to load family tree");
    }
  };

  const openMember = async (id) => {
    try {
      const data = await getMemberProfile(id);
      setSelectedMember(data);
      setIsSidebarOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    return (
      <p style={{ color: 'red' }}>
        {error}
      </p>
    );
  }

  return (
    <div
      style={{
        padding: '60px 20px',
        background: '#f8fafc',
        minHeight: '100vh',
        textAlign: 'center'
      }}
    >
      <div
        style={{
          display: 'inline-block',
          overflowX: 'auto'
        }}
      >
        {familyData ? (
          <TreeBranch
            node={familyData}
            onSelect={openMember}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <MemberSidebar
        member={selectedMember}
        onClose={() => {
          setIsSidebarOpen(false);
          setSelectedMember(null);
        }}
      />

    </div>
  );
}

export default FamilyTreeGraph;

