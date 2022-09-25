package codergoblin.desertrose

data class Post(
    val id: String,
    val title: String,
    val pictureUrl: String,
    val description: String,
    val tags: List<String>,
    val timestamp: Long
)
