import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, FlatList, Text, StatusBar, StyleSheet, TouchableOpacity, Button } from "react-native";
import { Repository } from './services/api'

export default () => {
  const [repositories, setRepositories] = useState([])
  useEffect(() => {
    Repository.list().then(res => {
      setRepositories(res.data)
    })
  }, [])

  const handleLikeRepository = async (item) => {
    let index = repositories.findIndex(repository => repository.id == item.id)

    if (index === -1) {
      return
    }

    if (!item.liked) {
      item.liked = true
      await Repository.like(item.id)
      item.likes = item.likes+1
    } else {
      item.liked = false
      await Repository.dislike(item.id)
      item.likes = item.likes - 1
    }

    repositories[index] = item
    setRepositories([...repositories])
  }

  async function handleAddRepository() {
    let d = new Date()
    let data = {
      title: `Projeto ${d.getDate()}/${d.getDay()}/${d.getFullYear()}${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
      url: "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs",
      techs: ['ReactJS', 'Node']
    }
    Repository.add(data).then(res => {
      setRepositories([...repositories, res.data])
    })
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{item.title}</Text>

              <View style={styles.techsContainer}>
                {item.techs.map(tech => (
                  <Text key={tech} style={styles.tech}> {tech} </Text>
                ))}
              </View>

              <View style={styles.likesContainer}>
                <Text style={styles.likeText} testID={`repository-likes-${item.id}`}>
                  {item.likes} curtidas
                </Text>
              </View>

              <TouchableOpacity
                style={styles.likeButton}
                onPress={() => handleLikeRepository(item)}
                testID={`like-button-${item.id}`}
              >
                {!item.liked && <Text style={styles.buttonText}>Curtir</Text>}
                {item.liked && <Text style={styles.buttonText}>Descurtir</Text>}
              </TouchableOpacity>
            </View>
          }
        />
        <Button color={styles.button.color} title="Adicionar" onPress={handleAddRepository}/>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  likeButton: {
    marginTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
    borderRadius: 6
  },
  title: {
    fontSize: 24,
    color: '#fff'
  },
  button: {
    color: '#bdbdbd',
    backgroundColor: "#bdbdbd",
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  }
})