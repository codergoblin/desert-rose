package codergoblin.desertrose

import org.apache.commons.csv.CSVFormat
import java.io.File
import java.io.FileInputStream
import java.lang.System.currentTimeMillis
import java.net.URI
import java.net.URL
import java.time.LocalDate
import java.time.ZoneOffset.UTC
import java.util.regex.Pattern

class CsvRegistry(private val config: DRConfig) : Registry {

    private val categoryCache = HashMap<String, Category>()
    private val postCache = HashMap<String, Post>()
    private var lastUpdate: Long = 0

    override val categories: Collection<Category>
        get() {
            reloadCache()
            return categoryCache.values
        }

    override val posts: Collection<Post>
        get() {
            reloadCache()
            return postCache.values
        }

    private fun reloadCache() {
        val now = currentTimeMillis()
        if (lastUpdate + config.csvReloadFrequency.toMillis() > now) {
            return
        }
        lastUpdate = now

        try {
            readCategories().forEach {
                categoryCache[it.tag] = it
            }
            readPosts().forEach {
                postCache[it.id] = it
            }
        } catch (e: Exception) {
            System.err.println(e.message)
        }
    }

    private fun readCategories(): List<Category> {
        return URL(config.categoryLocation).openStream().use {
            CSVFormat.Builder.create(CSVFormat.DEFAULT).apply {
                setIgnoreSurroundingSpaces(true)
                setHeader("tag", "title", "description")
            }.build().parse(it.reader())
                .drop(1)
                .map {
                    Category(it.get("tag"), it.get("title"), it.get("description"))
                }
        }
    }

    private fun readPosts(): List<Post> {
        return URL(config.postLocation).openStream().use {
            CSVFormat.Builder.create(CSVFormat.DEFAULT).apply {
                setIgnoreSurroundingSpaces(true)
                setHeader("id", "title", "pictureUrl", "tags", "date", "description")
            }.build().parse(it.reader())
                .drop(1)
                .map {
                    Post(
                        it.get("id"),
                        it.get("title"),
                        it.get("pictureUrl"),
                        it.get("description"),
                        it.get("tags").split(Pattern.compile("\\s")),
                        LocalDate.parse(it.get("date")).atStartOfDay().toEpochSecond(UTC) * 1000
                    )
                }
        }
    }

}