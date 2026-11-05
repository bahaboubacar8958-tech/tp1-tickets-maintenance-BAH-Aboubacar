<script setup>
import { ref, computed, onMounted } from 'vue'
import { getTickets } from '../services/ticketService'

const tickets = ref([])
const loading = ref(true)
const error = ref('')
const recherche = ref('')
const filtreStatut = ref('')
const filtrePriorite = ref('')

onMounted(async () => {
  try {
    tickets.value = await getTickets()
  } catch (e) {
    error.value = e instanceof Error
      ? e.message
      : 'Impossible de charger les tickets. Vérifiez que JSON Server est démarré sur le port 3000.'
  } finally {
    loading.value = false
  }
})

const ticketsFiltres = computed(() =>
  tickets.value.filter((t) =>
    t.titre.toLowerCase().includes(recherche.value.trim().toLowerCase()) &&
    (!filtreStatut.value || t.statut === filtreStatut.value) &&
    (!filtrePriorite.value || t.priorite === filtrePriorite.value)
  )
)

const classePriorite = (p) =>
  ({ Haute: 'b-rouge', Moyenne: 'b-jaune', Basse: 'b-vert' })[p] || ''
const classeStatut = (s) =>
  ({ Ouvert: 'b-bleu', 'En cours': 'b-jaune', Résolu: 'b-vert' })[s] || ''
</script>

<template>
  <section class="tickets">
    <h1>Tickets de maintenance</h1>

    <p v-if="loading" role="status">Chargement…</p>
    <p v-else-if="error" role="alert" class="erreur">{{ error }}</p>

    <template v-else>
      <div class="filtres">
        <label>Recherche par titre
          <input v-model="recherche" type="search" placeholder="Ex : imprimante" />
        </label>
        <label>Statut
          <select v-model="filtreStatut">
            <option value="">Tous</option>
            <option>Ouvert</option>
            <option>En cours</option>
            <option>Résolu</option>
          </select>
        </label>
        <label>Priorité
          <select v-model="filtrePriorite">
            <option value="">Toutes</option>
            <option>Haute</option>
            <option>Moyenne</option>
            <option>Basse</option>
          </select>
        </label>
      </div>

      <p aria-live="polite">{{ ticketsFiltres.length }} ticket(s) affiché(s) sur {{ tickets.length }}</p>
      <p v-if="ticketsFiltres.length === 0">Aucun ticket ne correspond à votre recherche.</p>

      <table v-else>
        <thead>
          <tr><th>Titre</th><th>Demandeur</th><th>Priorité</th><th>Statut</th><th>Date</th></tr>
        </thead>
        <tbody>
          <tr v-for="t in ticketsFiltres" :key="t.id">
            <td>{{ t.titre }}</td>
            <td>{{ t.demandeur }}</td>
            <td><span class="badge" :class="classePriorite(t.priorite)">{{ t.priorite }}</span></td>
            <td><span class="badge" :class="classeStatut(t.statut)">{{ t.statut }}</span></td>
            <td>{{ t.dateCreation }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </section>
</template>

<style scoped>
.tickets {
  max-width: 960px;
  margin: 2.5rem auto;
  padding: 1.5rem 2rem 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  text-align: left;
}
h1 {
  margin: 0 0 1.5rem;
  font-size: 1.6rem;
  color: #14418a;
  border-bottom: 3px solid #14418a;
  padding-bottom: 0.6rem;
}

/* Filtres */
.filtres {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}
.filtres label {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
  flex: 1;
  min-width: 180px;
}
.filtres input,
.filtres select {
  padding: 0.55rem 0.7rem;
  font-size: 0.95rem;
  border: 1px solid #9ca3af;
  border-radius: 6px;
  background: #fff;
  color: #1f2937;
}
.filtres input:focus,
.filtres select:focus {
  outline: 3px solid #93c5fd;
  border-color: #14418a;
}

/* Messages */
.tickets > p {
  margin: 0.6rem 0;
  color: #4b5563;
}
.erreur {
  color: #8a1c1c !important;
  background: #fde8e8;
  border: 1px solid #8a1c1c;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  font-weight: 600;
}

/* Tableau */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.8rem;
  overflow: hidden;
  border-radius: 8px;
}
thead th {
  background: #14418a;
  color: #fff;
  padding: 0.75rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  text-align: left;
}
td {
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}
tbody tr:nth-child(even) { background: #f9fafb; }
tbody tr:hover { background: #eef4ff; }

/* Badges (texte + couleur + bordure = accessible) */
.badge {
  display: inline-block;
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
  border: 1.5px solid;
  white-space: nowrap;
}
.b-rouge { background: #fde8e8; color: #8a1c1c; border-color: #8a1c1c; }
.b-jaune { background: #fff4d6; color: #7a4d00; border-color: #7a4d00; }
.b-vert  { background: #e3f4e6; color: #1d5c2a; border-color: #1d5c2a; }
.b-bleu  { background: #e1ecff; color: #14418a; border-color: #14418a; }

@media (max-width: 640px) {
  .tickets { margin: 1rem; padding: 1rem; }
  table { font-size: 0.85rem; }
}
</style>