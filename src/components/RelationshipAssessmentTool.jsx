import React, { useState } from 'react';
import { 
  Heart, MessageCircle, Users, HandHeart, 
  Lock, Shuffle, Gift, CheckCircle, X 
} from 'lucide-react';

const RelationshipAssessmentTool = () => {
  // États pour la gestion de l'outil
  const [notes, setNotes] = useState({
    emotionalSupport: 0,
    responsibilitySharing: 0,
    communication: 0,
    compromise: 0,
    mutualTrust: 0,
    affection: 0,
    giftsAndSurprises: 0,
    qualityTime: 0
  });

  const [giftNotes, setGiftNotes] = useState({
    birthdayGifts: false,
    anniversaryGifts: false,
    spontaneousGifts: false,
    thoughtfulGifts: false
  });

  const [showResults, setShowResults] = useState(false);

  // Descriptions et configurations
  const ratingDescriptions = {
    0: "Non évalué",
    1: "Très insuffisant",
    2: "Insuffisant",
    3: "Moyen",
    4: "Bon",
    5: "Excellent"
  };

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
    }
  ];

  const giftOptions = [
    { key: "birthdayGifts", label: "Cadeaux d'anniversaire" },
    { key: "anniversaryGifts", label: "Cadeaux d'anniversaire de relation" },
    { key: "spontaneousGifts", label: "Cadeaux spontanés" },
    { key: "thoughtfulGifts", label: "Cadeaux réfléchis et personnalisés" }
  ];

  // Fonctions de gestion
  const handleChange = (value, critere) => {
    setNotes(prev => ({
      ...prev,
      [critere]: parseInt(value)
    }));
  };

  const handleGiftChange = (key) => {
    setGiftNotes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const calculerNoteGlobale = () => {
    const criteriaValues = Object.values(notes);
    const giftBonus = Object.values(giftNotes).filter(Boolean).length * 0.5;
    const totalNotes = criteriaValues.reduce((acc, note) => acc + note, 0);
    const averageNote = totalNotes / criteriaValues.length;
    
    return Math.min(5, averageNote + giftBonus).toFixed(2);
  };

  const interpreterNote = (note) => {
    if (note < 2) return "Relation en grande difficulté";
    if (note < 3) return "Relation fragile nécessitant des améliorations";
    if (note < 4) return "Relation stable mais à développer";
    if (note < 4.5) return "Relation solide et épanouissante";
    return "Relation exceptionnelle et harmonieuse";
  };

  const handleShowResults = () => {
    // Vérifier que tous les critères ont été évalués
    const allCriteriaRated = Object.values(notes).every(note => note > 0);
    if (allCriteriaRated) {
      setShowResults(true);
    } else {
      alert("Veuillez évaluer tous les critères avant de voir les résultats.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Introduction */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
          <div className="flex items-center mb-4">
            <Heart className="w-10 h-10 mr-4" />
            <h2 className="text-3xl font-bold">Outil d'Évaluation de Relation</h2>
          </div>
          <p className="text-white opacity-90">
            Cet outil innovant vous permet d'évaluer objectivement votre relation amoureuse. 
            En répondant à une série de questions sur différents aspects de votre vie commune, 
            vous obtiendrez un bilan détaillé et constructif de votre relation.
          </p>
        </div>

        {/* Contenu principal */}
        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Critères */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">
              Évaluation des Critères
            </h3>
            {criteriaDetails.map((criteria) => (
              <div 
                key={criteria.key} 
                className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center mb-2">
                  {criteria.icon}
                  <div className="ml-3 flex-grow">
                    <div className="font-semibold text-gray-800">{criteria.label}</div>
                    <div className="text-sm text-gray-600">{criteria.description}</div>
                  </div>
                  <select 
                    value={notes[criteria.key]} 
                    onChange={(e) => handleChange(e.target.value, criteria.key)}
                    className="w-24 border rounded py-1 px-2 text-sm"
                  >
                    {Object.entries(ratingDescriptions).map(([value, description]) => (
                      <option key={value} value={value}>{description}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}

            {/* Section Cadeaux */}
            <div className="mt-6 bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                Cadeaux et Surprises
              </h3>
              {giftOptions.map((option) => (
                <div key={option.key} className="flex items-center mb-2">
                  <input 
                    type="checkbox" 
                    id={option.key}
                    checked={giftNotes[option.key]}
                    onChange={() => handleGiftChange(option.key)}
                    className="mr-2 h-4 w-4 text-pink-600 focus:ring-pink-500"
                  />
                  <label 
                    htmlFor={option.key} 
                    className="flex items-center text-gray-700"
                  >
                    <Gift className="mr-2 text-orange-500" />
                    {option.label}
                  </label>
                </div>
              ))}
            </div>

            {/* Bouton Résultats */}
            <button 
              onClick={handleShowResults}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition duration-300 flex items-center justify-center"
            >
              <CheckCircle className="mr-2" /> Afficher les Résultats
            </button>
          </div>

          {/* Placeholder pour résultats */}
          <div className="hidden md:block bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-2xl opacity-50">
            <div className="text-center">
              <p className="text-gray-600">
                Vos résultats apparaîtront ici après l'évaluation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal des Résultats */}
      {showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative">
            <button 
              onClick={() => setShowResults(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 text-center">
              <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                Résultats de votre Relation
              </h3>

              <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-xl">
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                  {calculerNoteGlobale()}
                  <span className="text-2xl">/5</span>
                </div>
                
                <div className="text-xl font-semibold text-gray-700">
                  {interpreterNote(parseFloat(calculerNoteGlobale()))}
                </div>
              </div>

              <p className="mt-4 text-gray-600">
                N'oubliez pas que cet outil est un guide. 
                La communication et l'amour sont les vrais moteurs d'une relation réussie.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 text-center bg-white bg-opacity-80 p-2 text-xs text-gray-500">
        © 2024 Outil d'Évaluation de Relation. Tous droits réservés.
      </footer>
    </div>
  );
};

export default RelationshipAssessmentTool;