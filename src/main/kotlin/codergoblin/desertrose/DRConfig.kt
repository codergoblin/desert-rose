package codergoblin.desertrose

import java.time.Duration

data class DRConfig(
    val port: Int = 8080,
    val csvReloadFrequency: Duration = Duration.ofMinutes(1),
    val csvDirectory: String = "test-samples/"
)
