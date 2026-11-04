export default function FraisForm() { 
    // ToDo : déclarer les 6 états listés ci-dessus avec useState 
    const [idFrais, setIdFrais] = useState(null);
    const [anneeMois, setAnneeMois] = useState('');
    const [nbJustificatifs, setNbJustificatifs] = useState('');
    const [montant, setMontant] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    return ( 
    <View style={styles.container}> 
    <Text style={styles.title}>{frais ? "Modifier la note de frais" : "Saisir une note de frais"}</Text> 
    <View> 
        <Text>Année-mois :</Text> 
        <TextInput 
        style={styles.input} 
        placeholder="Année-mois (ex: 2023-10)" 
        value={anneeMois} 
        onChangeText={setAnneeMois} 
        /> 
    </View> 
    
    <View> 
        <Text>Nombre de justificatifs :</Text> 
        <TextInput 
        style={styles.input} 
        placeholder="Nombre de justificatifs" 
        keyboardType="numeric" 
        value={nbJustificatifs} 
        onChangeText={setNbJustificatifs} 
        /> 
    </View> 
    
    <View> 
        <Text>Montant saisi :</Text> 
        <TextInput editable={false}
        selectOnFocus={false} 
        style={[styles.input, { backgroundColor: "#f0f0f0" }]} 
        keyboardType="numeric" 
        value={montant} 
        onChangeText={setMontant} 
        /> 
    </View> 
    
    <View style={styles.smallButtonRow}> 
        <Pressable 
        style={[styles.smallbutton, styles.buttonDisabled]} 
        //onPress={handleSubmit} 
        disabled={loading} 
        ><Text style={styles.buttonText}> 
            Frais hors forfait 
            </Text></Pressable> 
        <Pressable 
        style={[styles.smallbutton, styles.buttonDisabled]} 
        //onPress={handleSubmit} 
        disabled={loading} 
        ><Text style={styles.buttonText}> 
        Frais au forfait 
        </Text></Pressable> 
        
    </View> 
    
    <Pressable 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleSubmit} 
        disabled={loading} 
    > 
        <Text style={styles.buttonText}> 
            {loading ? "Enregistrement..." : frais ? "Mettre à jour" : "Ajouter"} 
        </Text> 
        </Pressable> 
        {error ? <Text style={styles.error}>{error}</Text> : null} 
        </View> 
    ); 
}