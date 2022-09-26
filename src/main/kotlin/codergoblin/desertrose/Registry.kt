package codergoblin.desertrose

interface Registry {
    val categories: Collection<Category>
    val posts: Collection<Post>
}