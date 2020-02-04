import {Document, Schema, model} from 'mongoose'

interface IIncidentStatus {
    incidentId: string,
    nom_du_site:string,
    adresse:string,
    nom_du_redacteur:string,
    telephone:string,
    date_status:Date,
    evolution:string,
    en_evolution:boolean,
    maitrise:boolean,
    termine:boolean,
    impact:string,
    pas_de_risque_exterieur:boolean,
    risque_toxique_explosion:boolean,
    effet_a_exterieur:boolean,
    date_incident:string,
    heure_incident:string,
    localisation: string,
    quantite_produit: string,
    produit_en_cause: string,
    cinetique_lente: boolean,
    cinetique_rapide: boolean,
    effet_thermique: boolean,
    effet_surpression: boolean,
    effet_toxique:boolean,
    description: string,
    poi_declenche: boolean,
    date_poi: Date,
    secours_ext_alertes: boolean,
    confinement: boolean,
    evacuation: boolean,
    decede: number,
    ua: number,
    ur: number,
    impliques: number,
    poursuite_exploitation: boolean,
    arret_installation: boolean,
    autres_actions_installation: string,
    impact_site: string,
    impact_exterieur: string,
    informations_exterieur: string,
    observations: string
}

export interface IIncidentStatusDocument extends Document, IIncidentStatus {}

const incidentStatusSchema:Schema = new Schema({
    incidentId:{
        type: String,
        required:true
        },
    nom_du_site:{
        type:String,
        required:true
        },
    adresse:{
        type: String,
        required:true
        },
    nom_du_redacteur:{
        type: String,
        required: true
        },
    telephone:{
        type: String,
    },
    date_status:{type: Date},
    evolution:{
        type: String,
        default: "en_evolution"
        },
    en_evolution:{
        type: Boolean,
        required: true
    },
    maitrise:{
        type: Boolean,
        required: true
    },
    termine:{
        type: Boolean,
        required: true
    },
    
    impact:{
        type: String,
        required: true
        },
    pas_de_risque_exterieur:{
        type: Boolean,
        required: true
        },
    risque_toxique_explosion:{
        type: Boolean,
        required: true
        },
    effet_a_exterieur:{
        type: Boolean,
        required: true
        },
    date_incident:{
        type: Date,
        required: true
        },
    localisation: {
        type: String,
        required: true
        },
    quantite_produit: {
        type: String,
        required: false
        },
    produit_en_cause: {
        type: String,
        required: false
        },
    cinetique_lente: {
        type: Boolean,
        default: false
        },
    cinetique_rapide: {
        type: Boolean,
        default: false
        },
    effet_thermique: {
        type: Boolean,
        default: false
        },
    effet_surpression: {
        type: Boolean,
        default: false
        },
    effet_toxique:{
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
        },
    poi_declenche: {
        type: Boolean,
        defaul: true
        },
    date_poi: {
        type: Date,
        required: true
        },
    secours_ext_alertes: {
        type: Boolean,
        required: true
        },
    confinement: {
        type: Boolean,
        default: false
        },
    evacuation: {
        type: Boolean,
        default: false
        },
    decede: {
        type: Number,
        default: 0
        },
    ua: {
        type: Number,
        default: 0
        },
    ur: {
        type: Number,
        default: 0
        },
    impliques: {
        type: Number,
        default: 0
        },
    poursuite_exploitation: {
        type: Boolean,
        required: true
        },
    arret_installation: {
        type: Boolean,
        required: true
        },
    autres_actions_installation: {
        type: String,
        required: false
        },
    impact_site: {
        type: String,
        required: false
        },
    impact_exterieur: {
        type: String,
        required: false
        },
    informations_exterieur: {
        type: String,
        required: false
        },
    observations: {
        type: String,
        required: false
        }
})

export const IncidentStatus = model<IIncidentStatusDocument>('incidentStatus',incidentStatusSchema)