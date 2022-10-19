import { View, Text, TouchableOpacity} from 'react-native'
import React from 'react'

const SubmitBu = ({title, HandleSubmit, loading}) => {
  return (
    <View>
    <View style={{paddingHorizontal:20, marginTop:10,paddingVertical:5}}>
    <TouchableOpacity style={{backgroundColor: "black", height: 40, justifyContent: 'center', borderRadius: 20,}} onPress={HandleSubmit} >
    <Text style={{textAlign: 'center', color:"white", fontWeight:'500'}}>{loading ? 'Please wait...' : title}</Text>
    </TouchableOpacity>
       </View>
    </View>
  )
}

export default SubmitBu