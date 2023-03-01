import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const Paginator = ({data,activeIndex}) => {
  return (
    <View style = {{flexDirection: 'row'}}>
        {data.map((_,i) => {
            return <View style = {[styles.dot,{width: 10, backgroundColor: activeIndex === i ? 'white' : 'darkgray' }]} key = {i.toString()} />;
        })}
    </View>
  )
}

const styles = StyleSheet.create({

    dot: {
        height:10,
        borderRadius: 5,
        backgroundColor: 'darkgray',
        marginHorizontal: 8,
    }

})

export default Paginator