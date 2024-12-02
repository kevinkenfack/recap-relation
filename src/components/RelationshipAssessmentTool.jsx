import React, { useState } from 'react';
import { Heart, Star, MessageCircle, Shield, Users, HandHeart, Lock, Shuffle, TrendingUp, Gift, CheckCircle } from 'lucide-react';

const RelationshipAssessmentTool = () => {
  // État étendu avec plus de critères
  const [notes, setNotes] = useState({
    emotionalSupport: 0,
    responsibilitySharing: 0,
    communication: 0,
    compromise: 0,
    mutualTrust: 0,
    affection: 0,
    giftsAndSurprises: 0,
    qualityTime: 0,
    sexualIntimacy: 0,
    personalGrowth: 0
  });

  // Nouvel état pour les notes de cadeaux
  const [giftNotes, setGiftNotes] = useState({
    birthdayGifts: false,
    anniversaryGifts: false,
    spontaneousGifts: false,
    thoughtfulGifts: false
  });

  // État pour afficher les résultats
  const [showResults, setShowResults] = useState(false);

  // Descriptions des notes
  const ratingDescriptions = {
    0: "Non évalué",
    1: "Très insuffisant",
    2: "Insuffisant",
    3: "Moyen",
    4: "Bon",
    5: "Excellent"
  };

  // Critères avec icônes et descriptions
  const criteriaDetails = [
    { 
      key: "emotionalSupport", 
      label: "Soutien Émotionnel", 
      icon: <HandHeart className="text-pink-500" />,
      description: "Capacité à être présent et empathique lors des moments difficiles"
    },
    { 
      key: "responsibilitySharing", 
      label: "Partage des Responsabilités", 
      icon: <Users className="text-blue-500" />,
      description: "Répartition équitable des tâches et décisions"
    },
    { 
      key: "communication", 
      label: "Communication", 
      icon: <MessageCircle className="text-green-500" />,
      description: "Ouverture, écoute active et expression claire des sentiments"
    },
    { 
      key: "compromise", 
      label: "Compromis et Ajustements", 
      icon: <Shuffle className="text-purple-500" />,
      description: "Capacité à trouver des solutions mutuellement satisfaisantes"
    },
    { 
      key: "mutualTrust", 
      label: "Confiance Mutuelle", 
      icon: <Lock className="text-gray-700" />,
      description: "Sentiment de sécurité et de fiabilité dans la relation"
    },
    { 
      key: "affection", 
      label: "Démonstration d'Affection", 
      icon: <Heart className="text-red-500" />,
      description: "Expressions physiques et verbales d'amour"
    },
    { 
      key: "giftsAndSurprises", 
      label: "Cadeaux et Surprises", 
      icon: <Gift className="text-orange-500" />,
      description: "Attention portée aux surprises et cadeaux significatifs"
    }
  ];

  // Options de cadeaux
  const giftOptions = [
    { key: "birthdayGifts", label: "Cadeaux d'anniversaire" },
    { key: "anniversaryGifts", label: "Cadeaux d'anniversaire de relation" },
    { key: "spontaneousGifts", label: "Cadeaux spontanés" },
    { key: "thoughtfulGifts", label: "Cadeaux réfléchis et personnalisés" }
  ];

  // Mise à jour de la note pour un critère
  const handleChange = (value, critere) => {
    setNotes(prev => ({
      ...prev,
      [critere]: parseInt(value)
    }));
  };

  // Mise à jour des notes de cadeaux
  const handleGiftChange = (key) => {
    setGiftNotes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Calcul de la note globale
  const calculerNoteGlobale = () => {
    const criteriaValues = Object.values(notes);
    const giftBonus = Object.values(giftNotes).filter(Boolean).length * 0.5;
    const totalNotes = criteriaValues.reduce((acc, note) => acc + note, 0);
    const averageNote = totalNotes / criteriaValues.length;
    
    return Math.min(5, averageNote + giftBonus).toFixed(2);
  };

  // Interprétation de la note globale
  const interpreterNote = (note) => {
    if (note < 2) return "Relation en grande difficulté";
    if (note < 3) return "Relation fragile nécessitant des améliorations";
    if (note < 4) return "Relation stable mais à développer";
    if (note < 4.5) return "Relation solide et épanouissante";
    return "Relation exceptionnelle et harmonieuse";
  };

  // Gestion de l'affichage des résultats
  const handleShowResults = () => {
    setShowResults(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-2xl">
      <div className="flex items-center mb-6">
        <Heart className="w-10 h-10 text-red-500 mr-4" />
        <h2 className="text-3xl font-bold text-gray-800">Bilan Approfondi de la Relation</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Évaluation des Critères</h3>
          {criteriaDetails.map((criteria) => (
            <div key={criteria.key} className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm">
              <div className="mr-4">{criteria.icon}</div>
              <div className="flex-grow">
                <div className="font-semibold text-gray-700">{criteria.label}</div>
                <div className="text-sm text-gray-500">{criteria.description}</div>
              </div>
              <div className="flex items-center">
                <select 
                  value={notes[criteria.key]} 
                  onChange={(e) => handleChange(e.target.value, criteria.key)}
                  className="form-select w-20 border rounded py-1 px-2"
                >
                  {Object.entries(ratingDescriptions).map(([value, description]) => (
                    <option key={value} value={value}>{description}</option>
                  ))}
                </select>
                <Star className="ml-2 text-yellow-500" />
              </div>
            </div>
          ))}

          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Cadeaux et Surprises</h3>
            {giftOptions.map((option) => (
              <div key={option.key} className="flex items-center mb-2">
                <input 
                  type="checkbox" 
                  id={option.key}
                  checked={giftNotes[option.key]}
                  onChange={() => handleGiftChange(option.key)}
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor={option.key} className="flex items-center">
                  <Gift className="mr-2 text-orange-500" />
                  {option.label}
                </label>
              </div>
            ))}
          </div>

          <button 
            onClick={handleShowResults}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          >
            <CheckCircle className="mr-2" /> Afficher les Résultats
          </button>
        </div>

        {showResults && (
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-center">Résultats de votre Relation</h3>
            <div className="bg-white p-4 rounded-xl text-center">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {calculerNoteGlobale()}
                <span className="text-2xl">/5</span>
              </div>
              <div className="text-xl font-semibold text-gray-700">
                {interpreterNote(parseFloat(calculerNoteGlobale()))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Ce bilan offre un aperçu de votre relation. 
                N'hésitez pas à en discuter ouvertement avec votre partenaire.
              </p>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <hr className="mb-4 border-gray-300" />
        © 2024 Outil d'Évaluation de Relation. Tous droits réservés.
      </footer>
    </div>
  );
};

export default RelationshipAssessmentTool;