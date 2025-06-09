export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { name, votes } = req.body;

  if (!name || !votes) {
    return res.status(400).json({ message: 'Données manquantes' });
  }

  console.log(`Vote reçu de ${name}`);
  console.log(votes);

  res.status(200).json({ message: 'Vote enregistré avec succès' });
}