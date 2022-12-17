-- CreateTable
CREATE TABLE `tier_list` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `public` BOOLEAN NOT NULL DEFAULT true,
    `can_be_template` BOOLEAN NOT NULL DEFAULT true,
    `template_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tier_list_ranks` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `color` VARCHAR(50) NOT NULL,
    `position` INTEGER NOT NULL,
    `tier_list_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tier_list_items` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NULL,
    `position` INTEGER NOT NULL,
    `tier_list_id` VARCHAR(191) NOT NULL,
    `tier_list_rank_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tier_list` ADD CONSTRAINT `tier_list_template_id_fkey` FOREIGN KEY (`template_id`) REFERENCES `tier_list`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tier_list_ranks` ADD CONSTRAINT `tier_list_ranks_tier_list_id_fkey` FOREIGN KEY (`tier_list_id`) REFERENCES `tier_list`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tier_list_items` ADD CONSTRAINT `tier_list_items_tier_list_id_fkey` FOREIGN KEY (`tier_list_id`) REFERENCES `tier_list`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tier_list_items` ADD CONSTRAINT `tier_list_items_tier_list_rank_id_fkey` FOREIGN KEY (`tier_list_rank_id`) REFERENCES `tier_list_ranks`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
