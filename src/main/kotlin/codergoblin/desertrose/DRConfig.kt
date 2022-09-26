package codergoblin.desertrose

import java.io.File
import java.time.Duration

data class DRConfig(
    val port: Int = 8080,
    val csvReloadFrequency: Duration = Duration.ofMinutes(1),
    val categoryLocation: String = File("test-samples/categories.csv").toURI().toString(),
    val postLocation: String = File("test-samples/posts.csv").toURI().toString()
)
