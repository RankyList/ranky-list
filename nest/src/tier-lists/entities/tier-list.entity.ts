import slugify from 'slugify';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { slugifyOptions } from 'src/common/utils/slugify.options';
import { Exclude } from 'class-transformer';

@Entity()
export class TierList {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null = null;

  @Column({ type: 'boolean', default: true })
  public = true;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date | null;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @BeforeInsert()
  addSlug() {
    this.slug = `${slugify(this.name, slugifyOptions)}-${new Date().getTime()}`;
  }

  @BeforeUpdate()
  updateSlug() {
    const slug = slugify(this.name, slugifyOptions);

    if (!this.slug.includes(slug)) {
      this.slug = `${slug}-${new Date().getTime()}`;
    }
  }
}
