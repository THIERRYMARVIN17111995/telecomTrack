export enum ProjectStatus {
  PLANNED = 'PLANNED',        // Projet créé, pas encore démarré
  IN_PROGRESS = 'IN_PROGRESS', // Travaux en cours
  ON_HOLD = 'ON_HOLD',        // Bloqué (logistique, client, EHS...)
  COMPLETED = 'COMPLETED',    // Travaux terminés (QC OK)
  ACCEPTED = 'ACCEPTED',      // Accepté par le client
  CLOSED = 'CLOSED',          // Projet clôturé (facturation OK)
  CANCELLED = 'CANCELLED',    // Annulé
}
